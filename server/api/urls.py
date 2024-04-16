from django.contrib import admin
from django.urls import path,include
from api.views import (UserRegisterApiView,UserLoginApiView,UserProfileAndUpdateApiView)

urlpatterns = [
    # path('api/', include('api.urls')),
    path('user/register/',UserRegisterApiView.as_view(),name='user-register-api-view'),
    path('user/login/',UserLoginApiView.as_view(),name='user-login-api-view'),
    path('user/profile/',UserProfileAndUpdateApiView.as_view(),name='user-profile-api-view'),
    path('user/update/',UserProfileAndUpdateApiView.as_view(),name='user-update-api-view'),
    
    #City api 
    path('admin/',include('cityandsubject.urls'),name='user-update-api-view'),
    
]