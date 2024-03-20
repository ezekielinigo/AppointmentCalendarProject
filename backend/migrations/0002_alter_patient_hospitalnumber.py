# Generated by Django 5.0.3 on 2024-03-20 06:50

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='hospitalNumber',
            field=models.CharField(blank=True, default='', max_length=6, validators=[django.core.validators.RegexValidator('^\\d{6}$', message='Format: 123456')]),
        ),
    ]