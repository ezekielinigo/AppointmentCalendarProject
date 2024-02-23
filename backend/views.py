from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import AppointmentSerializer
from .models import Appointment


# Create your views here.
class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
