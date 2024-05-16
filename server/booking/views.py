from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework import ap
# All Booking serializer
from booking.serializers import (BookingSerializer,BookingStatusUpdateSerializer,BookingOrderSerializer)
from rest_framework import generics

# All api serializer 
from api.serializers import (TutorSeriliazer,UserSerializer)
from booking.models import Booking
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from api.permissions import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import User

class CheckingView (APIView):
    serializer_class = BookingSerializer

    def get(self, request):
        try:
            booking = Booking.objects.all()
            serializer = self.serializer_class(booking, many=True)
            return Response(serializer.data)
        except Booking.DoesNotExist:
            return Response({'Error':'Booking does not exist'},status=status.HTTP_404_NOT_FOUND)


class BookingOrderView(APIView):
    # permission_classes=[IsAuthenticated,IsUser]
    def post(self,request,format=None):
        user = request.user.id
        # print(user)
        tutor_id = request.data.get('tutor_id')
        try:
            tutor_data = User.objects.get(pk=tutor_id)
            if tutor_data.tutor_approve == False:
                return Response({'Error':'This Tutor is not approved yet'},status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'Error':'User does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookingOrderSerializer(data={ **request.data , "user_id" : user })
        if serializer.is_valid():
            serializer.save()
            return Response({'Message':'Order has been booked now waiting for the Approval'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
  
# Tutor can check all the booking of his/hers
class TutorBookingOrderView(APIView):
    permission_classes=[IsTutor]
    def get(self,request,format=None):
        try:  
            user = request.user
            tutor = TutorSeriliazer(user)
            tutorId = tutor.data['id']
            booking = Booking.objects.filter(tutor_id=tutorId).filter(status='Pending').order_by('-order_date')
            serializer = BookingSerializer(booking,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({'Error':'Not able to fetch data'},status=status.HTTP_404_NOT_FOUND)
        
class TutorAllAcceptedBookingOrder(APIView):
    permission_classes = [IsTutor]
    def get(Self,request):
        try:
            user = request.user
            tutor = TutorSeriliazer(user)
            tutorId = tutor.data['id']
            booking = Booking.objects.filter(tutor_id=tutorId).filter(status='Accepted').order_by('-order_date')
            serializer = BookingSerializer(booking,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({'Error':'Not able to fetch data'},status=status.HTTP_404_NOT_FOUND)
    
# Tutor can Accept-Reject request

@api_view(['PATCH'])   
@permission_classes([IsTutor]) 
def updateBookingStatus(request,pk):
    print('request',request)
    try:
        booking = Booking.objects.get(pk=pk)
        print('booking',booking)
        tutor = TutorSeriliazer(request.user)
        tutorId = tutor.data['email']
        print('tutorid',tutorId)
        if str(booking.tutor_id) == str(tutorId):
            print('updated')
            serializer = BookingStatusUpdateSerializer(booking,data = request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'Message':'Order has been approved'},status=status.HTTP_204_NO_CONTENT)
            return Response({'Error':'Status not found which you have provided'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Error':'This order is not booked for you'},status=status.HTTP_404_NOT_FOUND)
    except Booking.DoesNotExist:
        return Response({'Message':'Booking does not exist'})
   
# Tutor can delete booking
@api_view(['DELETE'])
@permission_classes([IsTutor])
def deleteBookingByTutor(request,pk,format=None):
    try:
        booking = Booking.objects.filter(pk=pk)
        booking.delete()
        return Response({'Response':'Deleted'},status=status.HTTP_204_NO_CONTENT)
    except Booking.DoesNotExist:
        return Response({'Error':'No data found'},status=status.HTTP_404_NOT_FOUND)
    

# User check order confirm or not
class UserCheckOrderApproval(APIView):
    permission_classes=[IsAuthenticated,IsUser]
    def get(self, request, format=None):
        try:
            user = request.user
            userserializer = UserSerializer(user)
    
            booking = Booking.objects.filter(user_id = userserializer.data['id']).order_by('-id')

            if not booking:
                return Response({'You have not yet ordered anything'})
            booking_serializer = BookingSerializer(booking, many=True)
            return Response(booking_serializer.data ,status=status.HTTP_200_OK) 
        except Booking.DoesNotExist:
            return Response({'Error':'No data found'},status=status.HTTP_404_NOT_FOUND)
        
        
class AdminOrderBookingApiView(generics.ListAPIView):
    queryset = Booking.objects.all()
    permission_classes = [IsAdmin]
    serializer_class = BookingSerializer