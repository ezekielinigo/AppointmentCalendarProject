from django.contrib import admin
from .models import *


# Register your models here.

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'time', 'followup', 'newPatient', 'appointmentNumber')
    search_fields = ('patient', 'date', 'time', 'followup', 'newPatient', 'appointmentNumber')
    list_filter = ('date', 'time', 'followup', 'newPatient', 'appointmentNumber')

class PatientAdmin(admin.ModelAdmin):
    list_display = ('nameLast', 'nameFirst', 'nameMiddle', 'hospitalNumber', 'birthdate', 'contact', 'email')
    search_fields = ('nameLast', 'nameFirst', 'nameMiddle', 'hospitalNumber', 'birthdate', 'contact', 'email')
    list_filter = ('hospitalNumber', 'nameLast')

admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Patient, PatientAdmin)