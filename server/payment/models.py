from django.db import models
from api.models import User
from booking.models import Booking

# Create your models here.
class Payment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT,related_name='payment_user')
    tutor_id = models.ForeignKey(User, on_delete=models.PROTECT,related_name='payment_tutor')
    booking_id = models.ForeignKey(Booking, on_delete=models.PROTECT,related_name='payment_booking') 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_intent = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user_id.first_name} - Course ID: {self.course} "