@echo off
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
start cmd /k "cd frontend && npm start"