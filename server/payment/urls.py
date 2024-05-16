from django.contrib import admin
from django.urls import path,include
from payment.views import *

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutView.as_view(), name='booking-test-api-view'),
]
