from django.contrib import admin
from django.urls import path,include
from api.views import (UserRegisterApiView,UserLoginApiView,UserProfileAndUpdateApiView,
                       UserPasswordChangeView,UserPasswordResetEmailView,UserPasswordResetView,
                    TutorRegisterApiView,TutotLoginApiView,TutorProfifeAndUpdateApiView,
                    AdminTutorView,AdminNotApprovedTutorView,approveTutorByAdmin
                    )

urlpatterns = [
    # path('api/', include('api.urls')),
    path('user/register/',UserRegisterApiView.as_view(),name='user-register-api-view'),
    path('user/login/',UserLoginApiView.as_view(),name='user-login-api-view'),
    path('user/profile/',UserProfileAndUpdateApiView.as_view(),name='user-profile-api-view'),
    path('user/update/',UserProfileAndUpdateApiView.as_view(),name='user-update-api-view'),
    path('user/change-password/',UserPasswordChangeView.as_view(),name='user-change-password-api-view'),
    path('user/reset-password/',UserPasswordResetEmailView.as_view(),name='user-reset-password-api-view'),
    path('user/reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='user-reset-password-uid-token-api-view'),
    
    #City api 
    path('admin/',include('cityandsubject.urls'),name='user-update-api-view'),
     
    #admin tutor
    path('admin/allTutor/',AdminTutorView.as_view(),name='user-update-api-view'),
    path('admin/allNotApprovedTutor/',AdminNotApprovedTutorView.as_view(),name='admin-all-not-approved-tutor-api-view'),
    path('admin/approveTutor/<pk>',approveTutorByAdmin, name='admin-approve-tutor'),
    
    # Tutor Api
    path('tutor/register/',TutorRegisterApiView.as_view(),name='tutor-register-api-view'),
    path('tutor/login/',TutotLoginApiView.as_view(),name='tutor-login-api-view'),
    path('tutor/profile/',TutorProfifeAndUpdateApiView.as_view(),name='tutor-profile-api-view'),
    path('tutor/update/',TutorProfifeAndUpdateApiView.as_view(),name='tutor-update-api-view'),
] 