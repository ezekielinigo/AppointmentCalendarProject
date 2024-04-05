@echo off
cd frontend && npm start
start cmd /k "cd /d "%~dp0" && python manage.py makemigrations && python manage.py migrate && python manage.py runserver"