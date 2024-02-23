from django.db import models


# Create your models here.
class Appointment(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(null=True)
    date = models.DateTimeField()

    def _str_(self):
        return self.title
