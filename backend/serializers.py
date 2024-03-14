from rest_framework import serializers
from .models import *




class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            'nameFirst',
            'nameMiddle',
            'nameLast',
            'hospitalNumber',
            'birthdate',
            'contact',
            'email'
        )

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    label = serializers.StringRelatedField(source='patient')
    class Meta:
        model = Appointment
        fields = (
            'label',
            'patient',
            'date',
            'time',
            'followup',
            'referral',
            'newPatient',
            'remarks',
            'appointmentNumber'
        )