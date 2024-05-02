from django.contrib import admin
from django.urls import path,include
from booking.views import (CheckingView,updateBookingStatus,UserCheckOrderApproval,TutorBookingOrderView,BookingOrderView)
urlpatterns = [
    path('all-booking/', CheckingView.as_view(), name='booking-test-api-view'),
    
    # Tutor booking
    path('tutor/booking-status/<pk>',updateBookingStatus, name='tutor-booking'),
    path('tutor/all-booking-order/',TutorBookingOrderView.as_view(), name='tutor-booking'),

    # user booking
    path('user/my-order/',UserCheckOrderApproval.as_view(), name='user-order'),
    path('user/book-tutor/',BookingOrderView.as_view(), name='user-order'),

]
