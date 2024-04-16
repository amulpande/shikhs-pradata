from rest_framework import serializers
from api.models import User,City,Subject
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator


'''
User Registration serializer
'''
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128,required=True, write_only=True)
    password2 = serializers.CharField(max_length=128,required=True, write_only=True)
    # all_fields = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'contact',
            'gender',
            'address',
            'password',
            'password2',
            'profile_image'
            # 'all_fields'

        ]
        extra_kwargs = {
            'password':{
                'write_only':True
            },
            'password2':{
                'write_only':True
            }
        }

    def create(self, validated_data):
        print(f"Validated data: {validated_data}") 
        email = validated_data.get('email')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        contact=validated_data.get('contact')
        gender = validated_data.get('gender')
        address = validated_data.get('address')
        profile_image = validated_data.get('profile_image')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')

        if password == password2:
            user = User(email=email, first_name=first_name,last_name=last_name,contact=contact,gender=gender,profile_image=profile_image,address=address)
            user.set_password(password)
            user.save()
            return user
        
        else:
            raise serializers.ValidationError('Password and Confirm Password does not match!')

class UserLoginSeriliazer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    address = serializers.CharField(read_only=True)
    profile_image = serializers.CharField(read_only=True)
    contact = serializers.CharField(read_only=True)
    gender = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model=User
        fields = '__all__'

    
    def validate(self, attrs):
        email = attrs['email']
        password = attrs['password']
        
        user = authenticate(email=email, password=password)
        
        if user is None:
            raise serializers.ValidationError('Invalid login credentials!')
        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            update_last_login(None,user)
            validation = {
                'id':user.id,
                'access':access_token,
                'refresh':refresh_token,
                'email':user.email,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'contact':user.contact,
                'address':user.address,
                'gender':user.gender,
                'profile_image':user.profile_image,
                'role':user.role
            }
            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credential from userlogin")
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=[
            'id',
            'email',
            'first_name',
            'last_name',
            'role',
            'contact',
            'profile_image',
            'gender',
            'address'
        ]
