from rest_framework import serializers
from api.models import User,Subject
from rating.models import Feedback

#feed for tutor 
class TutorFeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'