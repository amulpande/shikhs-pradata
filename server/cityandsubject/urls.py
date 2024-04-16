from django.contrib import admin
from django.urls import path,include
from cityandsubject.views import (CityListCreateApiView,CityRetrieveUpdateDeleteApiView,SubjectListCreateApiView,SubjectRetrieveUpdateDeleteApiView)

urlpatterns = [
    #City api 
    path('city/',CityListCreateApiView.as_view(),name='city-create-api-view'),
    path('city/<int:pk>',CityRetrieveUpdateDeleteApiView.as_view(),name='city-update-delete-display-api-view'),

    
    #Subject api 
    path('subject/',SubjectListCreateApiView.as_view(),name='subject-api-view'),
    path('subject/<int:pk>',SubjectRetrieveUpdateDeleteApiView.as_view(),name='subject-update-delete-display-api-view'),
    
]