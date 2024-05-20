from rest_framework import serializers
from payment.models import Payment

class AdminPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id',
            'user_id',
            'tutor_id',
            'admin_amount',
            'tutor_amount',
            'payment_date'
        ]


class TutorPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id',
            'user_id',
            'tutor_id',
            'admin_amount',
            'tutor_amount',
            'payment_date'
        ]