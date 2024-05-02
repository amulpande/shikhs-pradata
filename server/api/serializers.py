from rest_framework import serializers
from api.models import User, City, Subject
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from api.utils import Utils


"""
User Registration serializer
"""


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, required=True, write_only=True)
    password2 = serializers.CharField(max_length=128, required=True, write_only=True)
    # all_fields = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "contact",
            "gender",
            "address",
            "password",
            "password2",
            "profile_image",
            # 'all_fields'
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True},
        }

    def create(self, validated_data):

        email = validated_data.get("email")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        contact = validated_data.get("contact")
        gender = validated_data.get("gender")
        address = validated_data.get("address")
        profile_image = validated_data.get("profile_image")
        password = validated_data.get("password")
        password2 = validated_data.get("password2")

        if password == password2:
            user = User(
                email=email,
                first_name=first_name,
                last_name=last_name,
                contact=contact,
                gender=gender,
                profile_image=profile_image,
                address=address,
            )
            user.set_password(password)
            user.save()
            return user

        else:
            raise serializers.ValidationError(
                "Password and Confirm Password does not match!"
            )


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
        model = User
        fields = "__all__"

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials!")
        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            update_last_login(None, user)
            validation = {
                "id": user.id,
                "access": access_token,
                "refresh": refresh_token,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "contact": user.contact,
                "address": user.address,
                "gender": user.gender,
                "profile_image": user.profile_image,
                "role": user.role,
            }
            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credential from userlogin")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "role",
            "contact",
            "profile_image",
            "gender",
            "address",
        ]


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=50, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=50, style={"input_type": "password"}, write_only=True
    )
    class Meta:
        model = User
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        user = self.context.get("user")
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password does not match!"
            )
        user.set_password(password)
        user.save()
        return attrs


class UserPasswordResetEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ["email"] 

    def validate(self, attrs):
        email = attrs.get("email")
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            # using this so in url safe id is shown not the actual one
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = (
                "http://localhost:3000/reset-password/"
                + uid
                + "/"
                + token
                + "/"
            )

            body = "This is your reset password link " + link
            data = {"subject": "Reset Password", "body": body, "to_email": user.email}

            print("reset ", link)

            Utils.send_mail(data)
            return attrs
        else:
            raise serializers.ValidationError("Provided email is not valid user")


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=200, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=200, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = User
        fields = ["password", "password2"]

    def validate(self, attrs):

        password = attrs.get("password")
        password2 = attrs.get("password2")
        uid = self.context.get("uid")
        token = self.context.get("token")

        # print("uid ", uid)
        # print("token ", token)

        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password are not same"
            )
        id = int(smart_str(urlsafe_base64_decode(uid)))
        # print("id ", type(id))
        user = User.objects.get(id=id)
        print("User ", user)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError("Token is either invalid or expired")
        user.set_password(password)
        user.save()
        return attrs


class TutorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, required=True, write_only=True)
    password2 = serializers.CharField(max_length=128, required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "contact",
            "gender",
            "address",
            "password",
            "password2",
            "profile_image",
            "short_bio",
            "city",
            "subjects",
            "experience",
            "dob",
            "price",
        ]

        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True},
        }

    def create(self, validated_data):
        email = validated_data.get("email")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        contact = validated_data.get("contact")
        gender = validated_data.get("gender")
        address = validated_data.get("address")
        password = validated_data.get("password")
        password2 = validated_data.get("password2")
        profile_image = validated_data.get("profile_image")
        short_bio = validated_data.get("short_bio")
        city = validated_data.get("city")
        subject = validated_data.get("subjects")
        experience = validated_data.get("experience")
        dob = validated_data.get("dob")
        price = validated_data.get("price")

        if password == password2:
            user = User(
                email=email,
                first_name=first_name,
                last_name=last_name,
                contact=contact,
                gender=gender,
                address=address,
                profile_image=profile_image,
                short_bio=short_bio,
                city=city,
                subjects=subject,
                experience=experience,
                dob=dob,
                price=price,
                role=2,
            )
            user.set_password(password)
            user.save()
            return user
        else:
            raise serializers.ValidationError(
                "Password and Confirm password does not match"
            )


class TutorLoginSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, write_only=True)
    email = serializers.EmailField()
    role = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    contact = serializers.CharField(read_only=True)
    gender = serializers.CharField(read_only=True)
    profile_image = serializers.CharField(read_only=True)
    dob = serializers.CharField(read_only=True)
    price = serializers.CharField(read_only=True)
    short_bio = serializers.CharField(read_only=True)
    city = serializers.CharField(read_only=True)
    subjects = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)
    address = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = "__all__"

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials!")
        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)
            update_last_login(None, user)
            validation = {
                "id": user.id,
                "access": access_token,
                "refresh": refresh_token,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "contact": user.contact,
                "gender": user.gender,
                "address": user.address,
                "profile_image": user.profile_image,
                "dob": user.dob,
                "price": user.price,
                "short_bio": user.short_bio,
                "city": user.city.city_name,
                "subjects": user.subjects.subject_name,
                "role": user.role,
            }
            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")


class TutorSeriliazer(serializers.ModelSerializer):
    subjects_name = serializers.CharField(source = 'subjects.subject_name',read_only=True)
    city_name = serializers.CharField(source = 'city.city_name',read_only=True)
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "contact",
            "gender",
            "address",
            "profile_image",
            "short_bio",
            "city",
            "subjects",
            "experience",
            "dob",
            "price",
            "tutor_approve",
            "subjects_name",
            "city_name"
        ]

class TutorApprovedSerializer(serializers.ModelSerializer):
    subjects_name = serializers.CharField(source='subjects.subject_name',read_only=True)
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "contact",
            "gender",
            "address",
            "profile_image",
            "short_bio",
            "city",
            "subjects",
            "subjects_name",
            "experience",
            "dob",
            "price",
            "tutor_approve"
        ]
class TutorApproveByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'tutor_approve'
        ]
        
class TutorUserBlockedByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_blocked'
        ]
