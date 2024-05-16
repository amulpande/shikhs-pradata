from django.shortcuts import render
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from rest_framework import status

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
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        # 'price': '{{PRICE_ID}}',
                        'price': 'price_1PGhDQSAbZsKECSFGV3yAWJS',
                        'quantity': 1,
                    },
                ],
                payment_method_types=[
                    'card',
                ],
                mode='payment',
                success_url='http://localhost:3000/'+ '?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:3000/' + '?canceled=true',
            )
            return redirect(checkout_session.url)
        except Exception as e:
            return Response({'error':'Something went wrong'})

