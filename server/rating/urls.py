from django.contrib import admin
from django.urls import path,include
from rating.views import *

urlpatterns = [
    path('feedback-tutor/', UserFeedbackTutorApi.as_view(), name='feedbacck-tutor'),
    
]