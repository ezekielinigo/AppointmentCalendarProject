from rest_framework import serializers
from .models import *


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.StringRelatedField()
    class Meta:
        model = Appointment
        fields = (
            'patient',
            'date',
            'time',
            'followup',
            'referral',
            'newPatient',
            'remarks',
            'appointmentNumber'
        )

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