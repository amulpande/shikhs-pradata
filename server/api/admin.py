from django.contrib import admin

from api.models import User,City,Subject
from booking.models import Booking
from rating.models import Feedback
from payment.models import Payment
# Register your models here.
#User display data in django admin dashboard
class UserAdmin(admin.ModelAdmin):
    list_display=['email','first_name','role','address','contact','profile_image','gender','tutor_approve']
    
class CityAdmin(admin.ModelAdmin):
    list_display=['id','city_name','city_state']
    
    
class BookingAdmin(admin.ModelAdmin):
    list_display=['id','tutor_id','user_id','subject_id']
    
class FeedbackAdmin(admin.ModelAdmin):
    list_display=['id','tutor_id','user_id','review','star']
    
class PaymentAdmin(admin.ModelAdmin):
    list_display=['tutor_id','user_id','booking_id','tutor_amount','admin_amount','payment_date']

admin.site.register(User,UserAdmin)
admin.site.register(City,CityAdmin)
admin.site.register(Booking,BookingAdmin)
admin.site.register(Feedback,FeedbackAdmin)
admin.site.register(Payment,PaymentAdmin)