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

    def update(self, instance, validated_data):
        # Update the Patient instance
        patient_data = validated_data.pop('patient', None)
        if patient_data is not None:
            patient_serializer = PatientSerializer(instance.patient, data=patient_data, partial=True)
            if patient_serializer.is_valid(raise_exception=True):
                patient_serializer.save()

        # Update the Appointment instance
        instance.appointmentNumber = validated_data.get('appointmentNumber', instance.appointmentNumber)
        instance.date = validated_data.get('date', instance.date)
        instance.time = validated_data.get('time', instance.time)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.followup = validated_data.get('followup', instance.followup)
        instance.referralDoctor = validated_data.get('referralDoctor', instance.referralDoctor)
        instance.newPatient = validated_data.get('newPatient', instance.newPatient)
        instance.save()

        return instance

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
    class Meta:
        model = User 
        fields = ('id', 'username', 'password', 'first_name', 'last_name')