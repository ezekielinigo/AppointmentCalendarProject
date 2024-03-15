from django.db import models
from django.core.validators import RegexValidator
import datetime

# thumbnail: 01P-002
# req for audit: local hosting & local data storage
# per day and per month capacity

TIME_CHOICES = (
    ('07:00:00', '07:00 AM'),
    ('08:00:00', '08:00 AM'),
    ('09:00:00', '09:00 AM'),
    ('10:00:00', '10:00 AM'),
    ('11:00:00', '11:00 AM'),
    ('12:00:00', '12:00 PM'),
    ('13:00:00', '01:00 PM'),
    ('14:00:00', '02:00 PM'),
    ('15:00:00', '03:00 PM'),
    ('16:00:00', '04:00 PM'),
)

# Create your models here.
class Appointment(models.Model):
    # basic details to be displayed in calendar thumbnail
    # one appointment is to one patient
    patient = models.ForeignKey('Patient', related_name='appointment', on_delete=models.CASCADE, null=True)
    date = models.DateField(default=datetime.date.today)
    time = models.CharField(max_length=8, choices=TIME_CHOICES, default='07:00 AM')

    # followup details are optional, requires referral pic
    followup = models.BooleanField(default=False)
    referralDoctor = models.CharField(max_length=120, null=True, blank=True)
    newPatient = models.BooleanField(default=False)

    # remarks are optional, used for requesting specific doctors if available
    remarks = models.TextField(null=True, blank=True)

    # appointment number is auto-generated in format: MMDDYY-TTTT-XX, ex: 123124-01PM-01
    appointmentNumber = models.CharField(max_length=14, editable=False)
    def save(self, *args, **kwargs):
        if not self.appointmentNumber:
            # convert the time to 12-hour format and extract the hour and period
            time_12h = datetime.datetime.strptime(self.time, "%H:%M:%S").strftime("%I:%M %p")
            hour, period = time_12h.split(':')
            period = period[-2:]

            # Count the number of appointments for the specific date and time
            count = Appointment.objects.filter(date=self.date, time=self.time).count()

            # Generate the appointment number
            self.appointmentNumber = 'FM' + self.date.strftime("%m%d%y") + '-' + hour + period + '-' + str(count + 1).zfill(2)
        super(Appointment, self).save(*args, **kwargs)

    def __str__(self):
        if self.appointmentNumber:
            return self.appointmentNumber + ' : ' + self.patient.nameLast + ', ' + self.patient.nameFirst[0] + '.'

class Patient(models.Model):
    # in form fill-up, name is split and should be CAPITALIZED
    nameFirst = models.CharField(max_length=120, null=True)
    nameMiddle = models.CharField(max_length=120, null=True, blank=True)
    nameLast = models.CharField(max_length=120, null=True)

    birthdate = models.DateField(default=datetime.date.today)
    age = models.PositiveIntegerField(null=True, blank=True, editable=False)
    sex = models.CharField(
        max_length=6,
        choices=(
            ('MALE', 'MALE'),
            ('FEMALE', 'FEMALE')),
        default='MALE'
    )
    civilStatus = models.CharField(
        max_length=9,
        choices=(
            ('SINGLE', 'SINGLE'),
            ('MARRIED', 'MARRIED'),
            ('WIDOWED', 'WIDOWED'),
            ('SEPARATED', 'SEPARATED')),
        default='SINGLE'
    )

    # contact info
    hospitalNumber = models.CharField(
        validators=[RegexValidator(r'^\d{6}$', message='Format: 123456')],
        max_length=6,
        unique=True, null=True, blank=True
    )
    contact = models.CharField(
        validators=[RegexValidator(r'^\d{1,11}$', message='Format: 09123123123')],
        max_length=11,
        null=True, blank=True
    )
    email = models.EmailField(null=True)
    facebookName = models.CharField(max_length=120, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.birthdate:
            self.age = datetime.date.today().year - self.birthdate.year
        if self.nameFirst:
            self.nameFirst = self.nameFirst.upper()
        if self.nameMiddle:
            self.nameMiddle = self.nameMiddle.upper()
        if self.nameLast:
            self.nameLast = self.nameLast.upper()
        super(Patient, self).save(*args, **kwargs)

    def __str__(self):
        return self.nameLast + ', ' + self.nameFirst[0] + '.'
