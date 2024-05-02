from rest_framework import serializers
from api.models import User,Subject
from booking.models import Booking

# Order booking Api view
class BookingSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user_id.get_full_name",read_only=True)
    tutor_name = serializers.CharField(source="tutor_id.get_full_name",read_only=True)
    subject_name = serializers.CharField(source ='subject_id.subject_name',read_only=True)
    
    # print(user_id)
    class Meta:
        model = Booking
        fields = '__all__'
        
        
class BookingStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'status'
        ]
        
        
class BookingOrderSerializer(serializers.ModelSerializer):
    # user=serializers.CharField(source="user.first_name",read_only=True)
    class Meta:
        model = Booking
        fields = [
            'id',
            'user_id',
            'tutor_id',
            'subject_id',
            'booking_time',
            'booking_date',
        ]