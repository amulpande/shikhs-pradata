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
        user_id = request.user.id
        # print('price',price)
        try:
            
            # stripe accepts ind money as paise so we need to convert amount in paise
            prince_in_paise=int(float(price) * 100)
            product = stripe.Product.create(name=f'Tutor Payment - {tutor_id}')
            
            # Create a price object in Stripe
            price_object = stripe.Price.create(
                unit_amount=prince_in_paise,
                currency='inr',
                product=product.id,
            )
            stripe.api_key = settings.STRIPE_SECRET_KEY
            
            intent = stripe.PaymentIntent.create(
                amount=prince_in_paise,
                currency='inr',
                # receipt_email=user_data['email'],
                metadata={
                    'user_id': str(user_id),
                    # 'checked_courses': ','.join(map(str, checked_courses)),
                    'total_price': str(prince_in_paise)
                }
            )
            
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
                # success_url='http://localhost:3000/'+ '?success=true&session_id={CHECKOUT_SESSION_ID}',
                success_url='http://localhost:3000/payment/success',
                # cancel_url='http://localhost:3000/' + '?canceled=true',
                cancel_url='http://localhost:3000/payment/fails',
            )
            # return Response({'sessionId': checkout_session.id, 'redirect_url': checkout_session.url})
            return Response({'sessionId': checkout_session.id})
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class StripeWebhookView(APIView):
    def __init__(self):
        super().__init__()
        self.meta = {} 
        
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.headers['Stripe-Signature']
        event = None
        # print("$$$44$$$$$==", payload, "sig_HEADER==" ,sig_header, "EVENT==",event)
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, os.environ.get('STRIPE_ENDPOINT_SECRET')
            )
        except ValueError as e:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            return HttpResponse(status=400)

        # print("event = " , event)
        
        
        # Handle the event
        if event['type'] == 'checkout.session.completed':
            payment_intent = event['data']['object']
            # print("payment_intent==> ", payment_intent)
            payment_id = payment_intent['payment_intent']
            amount = payment_intent['amount_total'] / 100  # Stripe amounts are in cents
            # user_email = payment_intent['receipt_email']
            try:
                # # Retrieve the user ID and checked courses from metadata
                # metadata = payment_intent.get('metadata', {})
                metadata = payment_intent['metadata']
                # print("metadata = " , metadata)
                user_id = metadata.get('user_id')
                checked_courses = metadata.get('checked_courses', '').split(',')
                
                # print("userid=", user_id, "checkedCourses=", checked_courses)
                
                # Retrieve the user object
                user = User.objects.get(pk=user_id)
                
                # Iterate over checked courses and create Payment objects
                # for course_id in checked_courses:
                    # print("called")
                    # course = Course.objects.get(pk=course_id)
                    # payment = Payment.objects.create(
                    #     user=user,
                    #     course=course,
                    #     amount=amount,  # You may want to adjust this based on your requirements
                    #     payment_date=datetime.now(),  # Set payment date to current date and time
                    #     payment_intent=payment_id
                    # )
            except (User.DoesNotExist) as e:
                return HttpResponse(status=400)  # Handle user or course not found

        return HttpResponse(status=200)
