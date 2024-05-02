# Generated by Django 5.0.4 on 2024-04-25 07:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking_time', models.TimeField()),
                ('booking_date', models.CharField(max_length=10)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'), ('Rejected', 'Rejected')], default='Pending', max_length=20)),
                ('cancellation_reason', models.TextField(blank=True)),
                ('payment_status', models.CharField(choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid')], default='Unpaid', max_length=20)),
                ('subject_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booking_subject', to=settings.AUTH_USER_MODEL)),
                ('tutor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booking_tutor', to=settings.AUTH_USER_MODEL)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booking_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
