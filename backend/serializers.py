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
    patient = PatientSerializer()
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

    def create(self, validated_data):
        patient_data = validated_data.pop('patient')
        patient_serializer = PatientSerializer(data=patient_data)
        if patient_serializer.is_valid(raise_exception=True):
            patient = patient_serializer.save()
            return Appointment.objects.create(patient=patient, **validated_data)

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = (
            'id',
            'month',
            'year',
            'capacity'
        )

#class DoctorSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Doctor
#        fields = (
#            'id',
#            'name',
#            'specialization',
#            'contact',
#            'email',
#            'facebookName',
#            'address',
#            'available'
#        )

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        #fields = ['id', 'username', 'password']
        fields = ['id', 'username', 'password', 'first_name', 'last_name']