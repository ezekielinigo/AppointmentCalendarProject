from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            'id',
            'nameFirst',
            'nameMiddle',
            'nameLast',
            'birthdate',
            'age',
            'sex',
            'civilStatus',
            'hospitalNumber',
            'contact',
            'email',
            'facebookName',
            'address'
        )

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    label = serializers.StringRelatedField(source='patient')
    class Meta:
        model = Appointment
        fields = (
            'id',
            'appointmentNumber',
            'patient',
            'label',
            'date',
            'time',
            'remarks',
            'followup',
            'referralDoctor',
            'newPatient'
        )

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = (
            'id',
            'month',
            'year',
            'capacity'
        )

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = (
            'id',
            'name',
            'specialization',
            'contact',
            'email',
            'facebookName',
            'address',
            'available'
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']