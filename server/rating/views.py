from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rating.models import Feedback
from rating.serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class UserFeedbackTutorApi(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = TutorFeedBackSerializer
    # permiss = [IsAuthenticated]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user.id
        serializer = self.get_serializer(data={**request.data,'user_id':user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class  UserFeedbackUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = TutorFeedBackSerializer
    permission_classes = [IsAuthenticated]
