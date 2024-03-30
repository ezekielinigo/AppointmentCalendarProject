from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from .models import *

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from django.contrib.auth import authenticate

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your views here.
class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class SettingView(viewsets.ModelViewSet):
    serializer_class = SettingSerializer
    queryset = Setting.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
#class DoctorView(viewsets.ModelViewSet):
#    serializer_class = DoctorSerializer
#    queryset = Doctor.objects.all()

#    def list(self, request, *args, **kwargs):
#        queryset = self.filter_queryset(self.get_queryset())
#        serializer = self.get_serializer(queryset, many=True)
#        return Response(serializer.data)
    
# auth
# Reference: https://youtu.be/llrIu4Qsl7c?si=ioJtFl2n2GNsgIxH
    
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])

        user.first_name = request.data['first_name'] #added
        user.last_name = request.data['last_name'] #added
        
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    if token:
        serializer = UserSerializer(user)
        return Response({'token': token.key, 'user': serializer.data})
    else:
        return Response("Authentication failed", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        try:
            user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            return Response("No active session", status=status.HTTP_404_NOT_FOUND)
        return Response("Successfully logged out.", status=status.HTTP_200_OK)
    else:
        return Response("Invalid credentials", status=status.HTTP_401_UNAUTHORIZED)