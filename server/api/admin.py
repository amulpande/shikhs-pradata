from django.contrib import admin

from api.models import User,City,Subject
# Register your models here.
#User display data in django admin dashboard
class UserAdmin(admin.ModelAdmin):
    list_display=['email','first_name','role','address','contact','profile_image','gender']
    
class CityAdmin(admin.ModelAdmin):
    list_display=['id','city_name','city_state']
    
admin.site.register(User,UserAdmin)
admin.site.register(City,CityAdmin)