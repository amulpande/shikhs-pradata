from django.contrib import admin

from api.models import User
# Register your models here.
#User display data in django admin dashboard
class UserAdmin(admin.ModelAdmin):
    list_display=['email','first_name','role','address','contact','profile_image','gender']
admin.site.register(User,UserAdmin)