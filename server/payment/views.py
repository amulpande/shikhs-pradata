from datetime import datetime
from django.shortcuts import render
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from rest_framework import status
from api.models import *
from django.conf import settings
from payment.models import Payment
from booking.models import Booking
# Create your views here.

import stripe
# This is a public sample test API key.
# Don’t submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

# @app.route('/create-checkout-session', methods=['POST'])
# def create_checkout_session():
class StripeCheckoutView(APIView):
    def post(self,request):
        price = request.data.get('price')
        tutor_id = request.data.get('tutor_id')
        booking_id = request.data.get('booking_id')
        user_id = request.user.id
        # print('price',price)
        try:
            
            # stripe accepts ind money as paise so we need to convert amount in paise
            price_in_paise=int(float(price) * 100)
            product = stripe.Product.create(name=f'Tutor Payment - {tutor_id}')
            
            # Create a price object in Stripe
            price_object = stripe.Price.create(
                unit_amount=price_in_paise,
                currency='inr',
                product=product.id,
            )
            
            
            intent = stripe.PaymentIntent.create(
                amount=price_in_paise,
                currency='inr',
                metadata={
                    'user_id': user_id,
                    'total_price': price_in_paise,
                    'booking_id':booking_id,
                    'tutor_id':tutor_id,
                }
            )
            print('intent metadata ',intent.metadata)
            
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price_object.id,
                        'quantity': 1,
                    },
                ],
                payment_method_types=[
                    'card'
                ],
                mode='payment',
                success_url='http://localhost:3000/payment/success',
                cancel_url='http://localhost:3000/payment/fails',
                metadata={
                    'user_id': user_id,
                    'total_price': price_in_paise,
                    'booking_id':booking_id,
                    'tutor_id':tutor_id,
                }
            )
            return Response({'sessionId': checkout_session.id})
        except Exception as e:
            return Response({'error': str(e)}, status=500)



class StripeWebhookView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.headers.get('Stripe-Signature')
        endpoint_secret = os.environ.get('STRIPE_ENDPOINT_SECRET')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError:
            return HttpResponse(status=400)

        if event['type'] == 'checkout.session.completed':
            print('inside checkout session completed')
            session = event['data']['object']
            
            # print('session coming or not ', session)
            payment_intent = session.get('payment_intent')
            
            print('payment intent ',payment_intent)
            tutor_total_amount = session.get('amount_total') / 100
            admin_amount = tutor_total_amount * 0.1 # 10% amount will be send to admin for using his site
            tutor_amount = tutor_total_amount-admin_amount # tutor payment after deduction of admin 10 % 
            
            # print('amount ',amount)
            metadata = session.get('metadata')
            print('Meta data   ',metadata)

            try:
                user_id = metadata.get('user_id')
                tutor_id= metadata.get('tutor_id')
                booking_id = metadata.get('booking_id')
                
                print('user id ',user_id)
                user = User.objects.get(pk=user_id)
                tutor = User.objects.get(pk=tutor_id)
                booking = Booking.objects.get(pk=booking_id)

                Payment.objects.create(
                    user_id=user,
                    tutor_id=tutor,
                    booking_id=booking,
                    admin_amount = admin_amount,
                    tutor_amount=tutor_amount,
                    payment_date=datetime.now(),
                    payment_intent=payment_intent
                )
                
                #updating booking status so user dont have to pay again if success
                booking = Booking.objects.get(pk=booking_id)
                booking.payment_status = 'Paid'
                booking.save()                

            except User.DoesNotExist:
                return HttpResponse(status=400)

        return HttpResponse(status=200)