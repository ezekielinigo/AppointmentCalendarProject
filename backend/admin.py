from django.contrib import admin
from .models import *


# Register your models here.

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'referralDoctor', 'newPatient')
    search_fields = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'referralDoctor', 'newPatient')
class PatientAdmin(admin.ModelAdmin):
    list_display = ('nameLast', 'nameFirst', 'birthdate', 'age', 'sex', 'civilStatus', 'hospitalNumber', 'contact', 'email', 'facebookName')
    search_fields = ('nameLast', 'nameFirst', 'birthdate', 'age', 'sex', 'civilStatus', 'hospitalNumber', 'contact', 'email', 'facebookName')

admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Patient, PatientAdmin)