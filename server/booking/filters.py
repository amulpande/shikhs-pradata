import django_filters
from booking.models import Booking

class BookingFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status', lookup_expr='icontains')
    class Meta:
        model = Booking
        fields = ['status']
        
class TutorBookingFilter(django_filters.FilterSet):
    payment_status = django_filters.CharFilter(field_name='payment_status', lookup_expr='iexact')    
    class Meta:
        model = Booking
        fields = ['payment_status']