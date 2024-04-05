from django.contrib import admin
from .models import *


# Register your models here.

class AppointmentAdmin(admin.ModelAdmin):
    #list_display = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient')
    #search_fields = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient')
    list_display = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient', 'isPending')
    search_fields = ('appointmentNumber', 'patient', 'date', 'time', 'followup', 'newPatient', 'isPending')
    
class PatientAdmin(admin.ModelAdmin):
    list_display = ('nameLast', 'nameFirst', 'hospitalNumber', 'birthdate', 'age', 'contact', 'email', 'facebookName')
    search_fields = ('nameLast', 'nameFirst', 'hospitalNumber', 'birthdate', 'age', 'contact', 'email', 'facebookName')

class SettingAdmin(admin.ModelAdmin):
    list_display = ('year', 'month', 'capacity')
    search_fields = ('year', 'month', 'capacity')

#class DoctorAdmin(admin.ModelAdmin):
#    list_display = ('name', 'specialization', 'contact', 'email', 'facebookName', 'address', 'available')
#    search_fields = ('name', 'specialization', 'contact', 'email', 'facebookName', 'address', 'available')

admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Setting, SettingAdmin)
#admin.site.register(Doctor, DoctorAdmin)