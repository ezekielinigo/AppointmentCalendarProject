# Generated by Django 5.0.3 on 2024-03-26 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_delete_doctor'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='label',
            field=models.CharField(editable=False, max_length=120, null=True),
        ),
    ]
