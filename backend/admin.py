from django.contrib import admin
from .models import *


# Register your models here.

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient')
    search_fields = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient')
class PatientAdmin(admin.ModelAdmin):
    list_display = ('nameLast', 'nameFirst', 'hospitalNumber', 'birthdate', 'age', 'contact', 'email', 'facebookName')
    search_fields = ('nameLast', 'nameFirst', 'hospitalNumber', 'birthdate', 'age', 'contact', 'email', 'facebookName')

admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Patient, PatientAdmin)