# Generated by Django 5.0.4 on 2024-05-23 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactus',
            name='isDeleted',
            field=models.BooleanField(default=False),
        ),
    ]
