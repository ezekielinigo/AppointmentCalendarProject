from rest_framework import serializers
from .models import *




class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
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