from django.db import models
from django.core.validators import RegexValidator
import datetime

TIME_CHOICES = (
    ('09:00:00', '09:00 AM'),
    ('10:00:00', '10:00 AM'),
    ('11:00:00', '11:00 AM'),
    ('12:00:00', '12:00 PM'),
    ('13:00:00', '01:00 PM'),
    ('14:00:00', '02:00 PM'),
    ('15:00:00', '03:00 PM'),
    ('16:00:00', '04:00 PM'),
    ('17:00:00', '05:00 PM'),
    ('18:00:00', '06:00 PM'),
)

# Create your models here.
class Appointment(models.Model):
    # basic details to be displayed in calendar thumbnail
    # one appointment is to one patient
    patient = models.ForeignKey('Patient', related_name='appointment', on_delete=models.CASCADE, null=True)
    date = models.DateField(default=datetime.date.today)
    time = models.CharField(max_length=8, choices=TIME_CHOICES, default='09:00 AM')

    # followup details are optional, requires referral pic
    followup = models.BooleanField(default=False)
    referral = models.ImageField(upload_to='referralImages/', null=True, blank=True)

    # new patients do not have hospital number yet
    newPatient = models.BooleanField(default=False)

    # remarks are optional, used for requesting specific doctors if available
    remarks = models.TextField(null=True, blank=True)

    # appointment number is auto-generated in format: DDMMYYYY-XXX, ex: 30122024-001
    appointmentNumber = models.CharField(max_length=12, editable=False)
    def save(self, *args, **kwargs):
        if not self.patient.hospitalNumber:
            self.newPatient = True
        else:
            self.newPatient = False

        if not self.appointmentNumber:
            count = Appointment.objects.filter(date=self.date).count()
            self.appointmentNumber = self.date.strftime("%d%m%Y") + '-' + str(count + 1).zfill(3)
        super(Appointment, self).save(*args, **kwargs)

    def __str__(self):
        return self.appointmentNumber

class Patient(models.Model):
    # in form fill-up, name is split and should be CAPITALIZED
    nameFirst = models.CharField(max_length=120, null=True, blank=True)
    nameMiddle = models.CharField(max_length=120, null=True, blank=True)
    nameLast = models.CharField(max_length=120, null=True, blank=True)

    # auto-capitalization of names
    def save(self, *args, **kwargs):
        if self.nameFirst is not None:
            self.nameFirst = self.nameFirst.upper()
        if self.nameMiddle is not None:
            self.nameMiddle = self.nameMiddle.upper()
        if self.nameLast is not None:
            self.nameLast = self.nameLast.upper()
        super(Patient, self).save(*args, **kwargs)

    # hospital number if old patient, leave blank if new
    # if db.patient.number == input.patient.number && db.patient == input.patient
    #   then continue to appointment creation as old patient
    # elif db.patient.number == input.patient.number && db.patient != input.patient
    #   then error: patient does not match hospital number
    # elif db.patient.number != input.patient.number
    #   then continue to appointment creation as new patient
    hospitalNumber = models.CharField(max_length=12, unique=True, null=True, blank=True)
    birthdate = models.DateField(default=datetime.date.today)
    contact = models.CharField(
        validators=[RegexValidator(r'^\d{1,11}$', message='Format: 09123123123')],
        max_length=11,
        null=True,
        blank=True
    )
    email = models.EmailField(null=True)

    def __str__(self):
        if self.hospitalNumber:
            return f'{self.hospitalNumber} - {self.nameLast}, {self.nameFirst[0]}.'
        else:
            return f'_____ - {self.nameLast}, {self.nameFirst[0]}.'
