from django.contrib import admin
from django.urls import path,include
from payment.views import *

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutView.as_view(), name='booking-test-api-view'),
    # path('webhook/stripe/', stripe_webhook, name='booking-test-api-view'),
    path('webhook/stripe/', StripeWebhookView.as_view(), name='booking-test-api-view'),
]
