"""
URL configuration for AppointmentCalendarProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r'appointments', views.AppointmentView, 'appointment')
router.register(r'patients', views.PatientView, 'patient')
router.register(r'settings', views.SettingView, 'setting')
router.register(r'doctors', views.DoctorView, 'doctor')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    path('signup', views.signup),
    path('login', views.login),
    path('test_token', views.test_token),
    path('logout/', views.logout),
]
