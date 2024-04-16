from django.shortcuts import render
from api.serializers import (UserRegisterSerializer,UserLoginSeriliazer,UserSerializer )
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from api.permissions import (IsTutor,IsUser)


#User registration api view
class UserRegisterApiView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, format=None):
        print('working or not')
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                response_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'id': user.id,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'contact': user.contact,
                        'role': str(user.role),
                        'profile_image': str(user.profile_image),
                        'gender': user.gender,
                        'address': user.address
                    }
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:  # Catch generic exception for logging or debugging
            print(f"Error during registration: {e}")
            return Response({'Message': 'Registration failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        

# user login api view
class UserLoginApiView(APIView):
    serializer_class = UserLoginSeriliazer
    # permission_classes
    def post(self,request,format=None):
        try:
            serializer = self.serializer_class(data=request.data)
            # print('show data')
            print(serializer)
            valid = serializer.is_valid(raise_exception=False)
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                'success': False,
                'statusCode': status_code,
                'errors': "Invalid Credentials"
            }
            if valid:
                print('seriliazer valid')
                if serializer.data['role'] == '3':
                    status_code = status.HTTP_200_OK
                    
                    response = {
                        'success':True,
                        'statuCode':status_code,
                        'access':serializer.data['access'],
                        'refresh':serializer.data['refresh'],
                        'user':{
                            'id':serializer.data['id'],
                            'email':serializer.data['email'],
                            'first_name':serializer.data['first_name'],
                            'last_name':serializer.data['last_name'],
                            'role':serializer.data['role'],
                            'address':serializer.data['address'],
                            'gender':serializer.data['gender'],
                            'profile_image':serializer.data['profile_image'],
                            'contact':serializer.data['contact']
                        }
                    }
                #     return Response(response,status=status.HTTP_200_OK)
                # else:
                #     return Response({'Message':'You are not Valid User'},status=status.HTTP_404_NOT_FOUND)
                return Response(response, status=status_code)
            return Response({'errors': "Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error':'Something went wrong'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserProfileAndUpdateApiView(APIView):
    permission_classes=[IsUser]
    def get(self,request):
        status_code = status.HTTP_401_UNAUTHORIZED
        response = {
            'success': False,
            'statusCode': status_code,
            'errors': "Authentication credentials were not provided."
        }
        try:
            serializer = UserSerializer(request.user)
            status_code=status.HTTP_200_OK
            response={
                'success': True,
                'statusCode': status_code,
                'user':serializer.data
            }
            return Response(response,status=status_code)
        except:
            return Response(response,status=status_code)
        
    def put(self,request,format=None):
        try:
            user = request.user
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error':'user not found'},status=status.HTTP_404_NOT_FOUND)

 