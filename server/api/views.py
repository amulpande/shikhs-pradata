from django.shortcuts import render
from api.serializers import (
    UserRegisterSerializer,
    UserLoginSeriliazer,
    UserSerializer,
    UserChangePasswordSerializer,
    UserPasswordResetEmailSerializer,
    UserPasswordResetSerializer,
    TutorRegistrationSerializer,
    TutorLoginSerializer,
    TutorSeriliazer,
    TutorApproveByAdminSerializer,
    TutorApprovedSerializer,
    TutorUserBlockedByAdminSerializer,
)
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from api.permissions import IsTutor, IsUser,IsAdmin
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination
from api.paginations import UserPagination,TutorPagination

from api.models import User
import os


# User registration api view
class UserRegisterApiView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, format=None):
        print("working or not")
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                response_data = {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "contact": user.contact,
                        "role": str(user.role),
                        "profile_image": str(user.profile_image),
                        "gender": user.gender,
                        "address": user.address,
                    },
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:  # Catch generic exception for logging or debugging
            print(f"Error during registration: {e}")
            return Response(
                {"Message": "Registration failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# user login api view
class UserLoginApiView(APIView):
    serializer_class = UserLoginSeriliazer

    # permission_classes
    def post(self, request, format=None):
        try:
            serializer = self.serializer_class(data=request.data)

            valid = serializer.is_valid(raise_exception=False)
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                "success": False,
                "statusCode": status_code,
                "errors": "Invalid Credentials",
            }
            if valid:
                print("seriliazer valid")
                if serializer.data["role"] == "3":
                    status_code = status.HTTP_200_OK

                    response = {
                        "success": True,
                        "statuCode": status_code,
                        "access": serializer.data["access"],
                        "refresh": serializer.data["refresh"],
                        "user": {
                            "id": serializer.data["id"],
                            "email": serializer.data["email"],
                            "first_name": serializer.data["first_name"],
                            "last_name": serializer.data["last_name"],
                            "role": serializer.data["role"],
                            "address": serializer.data["address"],
                            "gender": serializer.data["gender"],
                            "profile_image": serializer.data["profile_image"],
                            "contact": serializer.data["contact"],
                        },
                    }
                #     return Response(response,status=status.HTTP_200_OK)
                # else:
                #     return Response({'Message':'You are not Valid User'},status=status.HTTP_404_NOT_FOUND)
                return Response(response, status=status_code)
            return Response(response, status=status_code)
        except Exception as e:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UserPasswordChangeView(APIView):
    permission_classes = [IsAuthenticated, IsUser]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            return Response(
                {"Message": "Password Changed"}, status=status.HTTP_204_NO_CONTENT
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetEmailView(APIView):
    # permission_classes=[IsAuthenticated,IsUser]
    def post(self, request, format=None):
        # print("email reset -> ", request.data)
        # print("os email", os.environ.get("EMAIL_USER"))

        serializer = UserPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {"Message": "Reset password email has been sent to you"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetView(APIView):
    # permission_classes=[IsAuthenticated,IsUser]
    def post(self, request, uid, token, format=None):
        serializers = UserPasswordResetSerializer(
            data=request.data, context={"uid": uid, "token": token}
        )
        if serializers.is_valid():
            return Response(
                {"Message": "Password reset successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAndUpdateApiView(APIView):
    # permission_classes = [IsUser]

    def get(self, request):
        status_code = status.HTTP_401_UNAUTHORIZED
        response = {
            "success": False,
            "statusCode": status_code,
            "errors": "Authentication credentials were not provided.",
        }
        try:
            serializer = UserSerializer(request.user)
            status_code = status.HTTP_200_OK
            response = {
                "success": True,
                "statusCode": status_code,
                "user": serializer.data,
            }
            return Response(response, status=status_code)
        except:
            return Response(response, status=status_code)

    def patch(self, request, format=None):
        try:
            user = request.user
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(
                {"error": "user not found"}, status=status.HTTP_404_NOT_FOUND
            )


class TutorRegisterApiView(APIView):
    serializer_class = TutorRegistrationSerializer

    def post(self, request, format=None):
        # print(request.data)
        try:
            serilaizer = self.serializer_class(data=request.data)
            if serilaizer.is_valid():
                user = serilaizer.save()
                refresh = RefreshToken.for_user(user)
                print("view error")
                response_data = {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "contact": user.contact,
                        "gender": user.gender,
                        "address": user.address,
                        "role": str(user.role),
                        "profile_image": str(user.profile_image),
                        "short_bio": user.short_bio,
                        "city": user.city.city_name if user.city else None,
                        "subjects": (
                            user.subjects.subject_name if user.subjects else None
                        ),
                        "experience": user.experience,
                        "dob": user.dob,
                        "price": user.price,
                    },
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response(serilaizer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(
                {"response": "something went wrong not able to register"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TutotLoginApiView(APIView):
    serializer_class = TutorLoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=False)
        status_code = status.HTTP_401_UNAUTHORIZED
        response = {
            "success": False,
            "statusCode": status_code,
            "errors": "Invalid credentials",
        }
        if valid:
            print("serializer data -> ", serializer.data)
            if serializer.data["role"] == "2":
                status_code = status.HTTP_200_OK
                response = {
                    "success": True,
                    "statucCode": status_code,
                    "access": serializer.data["access"],
                    "refresh": serializer.data["refresh"],
                    "user": {
                        "id": serializer.data["id"],
                        "email": serializer.data["email"],
                        "first_name": serializer.data["first_name"],
                        "last_name": serializer.data["last_name"],
                        "contact": serializer.data["contact"],
                        "gender": serializer.data["gender"],
                        "address": serializer.data["address"],
                        "profile_image": serializer.data["profile_image"],
                        "dob": serializer.data["dob"],
                        "price": serializer.data["price"],
                        "short_bio": serializer.data["short_bio"],
                        "city": serializer.data["city"],
                        "subjects": serializer.data["subjects"],
                        "role": serializer.data["role"],
                        "tutor_approve":serializer.data["tutor_approve"]
                    },
                }
            return Response(response, status=status_code)
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


class TutorProfifeAndUpdateApiView(APIView):
    serializer_class = TutorSeriliazer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        status_code = status.HTTP_401_UNAUTHORIZED
        response = {
            "success": False,
            "statusCode": status_code,
            "errors": "Authentication credentials were not provided.",
        }
        try:
            print("user data -> ", request.user)
            status_code = status.HTTP_200_OK
            serializer = self.serializer_class(request.user)
            response = {
                "success": True,
                "statusCode": status_code,
                "user": serializer.data,
            }
            return Response(response, status=status_code)
        except:
            return Response(response, status=status_code)

    def patch(self, request, format=None):
        user = request.user
        seriliazer = self.serializer_class(user, request.data, partial=True)

        if seriliazer.is_valid():
            seriliazer.save()
            return Response(seriliazer.data, status=status.HTTP_200_OK)
        return Response(seriliazer.errors, status=status.HTTP_401_UNAUTHORIZED)


class AdminLoginView(APIView):
    serializer_class = UserLoginSeriliazer
    
    def post(self,request,format=None):
        serializer = UserLoginSeriliazer(data=request.data)
        valid = serializer.is_valid(raise_exception=False)
        status_code = status.HTTP_401_UNAUTHORIZED
        response = {
            'success':False,
            'statusCode':status_code,
            'errors':'Invalid credentials'
        }
        if valid:
            if serializer.data["role"]=='1':
                status_code = status.HTTP_200_OK
                response = {
                    'success':True,
                    'statusCode':status_code,
                    'access':serializer.data['access'],
                    'refresh':serializer.data['refresh'],
                    'user':{
                        'id':serializer.data['id'],
                        'eamil':serializer.data['email'],
                        'role':serializer.data['role']
                    }
                }
        return Response(response,status=status_code)


class AdminTutorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search = request.query_params.get("search", "")
        user = User.tutorObject.get_all_tutor(search)
        if not user:
            return Response(
                {"Error": "No Tutor found in database"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = TutorSeriliazer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            if user.role == 3 or user.role == 1:
                return Response({"Message": "This user is not Tutor"})
            if user.tutor_approve == True:
                return Response(
                    {"Message", "You first have to disable this tutor than delete"},
                    status=status.HTTP_204_NO_CONTENT,
                )
            user.delete()
            return Response({"Message": "Deleted"})
        except:
            return Response({"Error": "Tutor not found"})
    
class AdminAllApprovedTutorView(generics.ListAPIView):
    queryset = User.tutorObject.get_approve_tutor()
    serializer_class = TutorApprovedSerializer
    pagination_class = TutorPagination
    
    def get_queryset(self):
        queryset = User.tutorObject.get_approve_tutor()
        query = self.request.query_params.get('search')
        if query:
            queryset = queryset.filter(first_name__icontains=query)
        return queryset
       
class  AdminBlockedTutorOrUserView(APIView):
    permission_classes = [IsAdmin]
    serializer_class = TutorUserBlockedByAdminSerializer
    def patch(self,request,pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'Message':'User does not exist'},status=status.HTTP_404_NOT_FOUND)
        if not user:
            return Response({'Error':'User not found for this id'},status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(user,data=request.data,partial=True)
        # print('patch tutor ',serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Updated user status'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class getBlockedTutorApiView(generics.ListAPIView):
    serializer_class = TutorSeriliazer
    pagination_class = TutorPagination
    queryset = User.tutorObject.get_all_blocked_tutor()

    def get_queryset(self):
        queryset = User.tutorObject.get_all_blocked_tutor()
        query = self.request.query_params.get('search')
        if query:
            queryset = queryset.filter(first_name__icontains=query)
        return queryset
@api_view(['GET']) 
@permission_classes([IsAdmin])
def getBlockedUserTutorApiView(request):
    try:
        user = User.tutorObject.get_all_blocked_tutor()
        # print(user)
        serializer = TutorSeriliazer(user,many=True)
        # if serializer.is_valid():
        return Response(serializer.data,status=status.HTTP_200_OK)
        
        # return Response({'h':'users'})
    except User.DoesNotExist:
        return Response({'Message':'User does not exist'},status=status.HTTP_404_NOT_FOUND)
     
class AdminNotApprovedTutorView(APIView):
    permission_classes = [IsAdminUser]
    def get(self,request):
        user = User.tutorObject.get_not_approve_tutor()
        if not user:
            return Response({'Message':'All tutor are approved right now'},status=status.HTTP_200_OK)
        serializer = TutorSeriliazer(user,many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AdminNotApprovedTutorApiView(generics.ListAPIView):
    queryset = User.tutorObject.get_not_approve_tutor()
    serializer_class = TutorSeriliazer
    permission_classes = [IsAdminUser]
    pagination_class = UserPagination
    
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def approveTutorByAdmin(request,pk):
    if request.method == 'PATCH':
        try:    
            user  = User.tutorObject.get_tutor_by_id(pk)
        except User.DoesNotExist:
            return Response({'Message':'User does not exist'},status=status.HTTP_404_NOT_FOUND)
        if not user:
            return Response({'Error':'User not found  for this id'},status=status.HTTP_404_NOT_FOUND)
        serializers = TutorApproveByAdminSerializer(user,data=request.data,partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response({'Message':'Tutor Updated'})
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'Error':'Wrong Method'})
    
class AdminAllUserDataApiView(generics.ListAPIView):
    # def get
    # pagination_class
    queryset = User.userObject.get_all_user()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    pagination_class = UserPagination
    
    def get_queryset(self):
        queryset = User.userObject.get_all_user()
        query = self.request.query_params.get('search')
        if query:
            queryset = queryset.filter(
                first_name__icontains=query 
                # Add more fields to search here
            )
        return queryset
    
class TutorDataByIdApiView(APIView):
    serializer_class = TutorSeriliazer
    def get(self,request,pk):
        try:
            user = User.tutorObject.get_tutor_by_id(pk)
        except User.DoesNotExist:
            return Response({'Message':'User does not exist'},status=status.HTTP_404_NOT_FOUND)
        if not user:
            return Response({'Error':'User not found  for this id'},status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

