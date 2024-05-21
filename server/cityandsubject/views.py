from django.shortcuts import render
from api.models import City,Subject
from rest_framework.generics import CreateAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from cityandsubject.serializers import (CitySerializer,SubjectSerializer)
from rest_framework import status
# Create your views here.

# City api view
class CityListCreateApiView(ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    authentication_classes = []
    
class CityRetrieveUpdateDeleteApiView(RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class=CitySerializer
    authentication_classes = []
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"response": "City deleted successfully.",'success':True}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e, status=status.HTTP_404_NOT_FOUND)
    

# Subject api view
class SubjectListCreateApiView(ListCreateAPIView):
    queryset = Subject.objects.all().order_by('-id')
    serializer_class = SubjectSerializer
    authentication_classes = []

class SubjectRetrieveUpdateDeleteApiView(RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all().order_by('-id')
    serializer_class = SubjectSerializer
    authentication_classes = []
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({'response':'Subject Deleted successfully','success':True},status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"response": "Subject does not exist",'success':False}, status=status.HTTP_404_NOT_FOUND)
    