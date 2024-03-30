/*
References:
Modal Component: https://react-bootstrap.netlify.app/docs/components/modal/ 
Buttons: https://react-bootstrap.netlify.app/components/buttons/
Routing: https://semaphoreci.com/blog/routing-layer-react
User Auth: https://youtu.be/llrIu4Qsl7c?si=ioJtFl2n2GNsgIxH
Context: https://react.dev/reference/react/createContext, https://www.youtube.com/watch?v=sP7ANcTpJr8
MUI Material: https://mui.com/material-ui/getting-started/
Session Storage: https://www.w3schools.com/jsref/prop_win_sessionstorage.asp

Notes (sqlite3 to postgresql):
pip install psycopg2

1. set settings.py to:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

python manage.py dumpdata > data.json
Open data.json using notepad -> save as -> encoding should be utf-8

2. download and install https://www.postgresql.org/download/
3. set password to 7V6D}1xh:kMx (kapag nag prompt)
3. open pgAdmin 4
4. create new server (name: rmcdb, host: localhost, port: 5432, maintenance db: postgres, username: postgres, password: 7V6D}1xh:kMx)
5. create new database (name: rmcdb)
6. set settings.py to:
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "rmcdb",
        "USER": "postgres",
        "PASSWORD": "7V6D}1xh:kMx",
        "HOST": "localhost",
        "PORT": "5432",
    }
}

python manage.py makemigrations
python manage.py migrate --run-syncdb
python manage.py shell
-- paste lines 46 to 49 on terminal then enter -- 
from django.contrib.contenttypes.models import ContentType
ContentType.objects.all().delete()
quit()

python manage.py loaddata data.json
python manage.py runserver

*/

import './App.css';
import React from 'react';
import Calendar from './components/Calendar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginClinic from './components/LoginClinic';
import LoginPatient from './components/LoginPatient';
import LandingPage from './components/LandingPage';
import { CalendarView } from "./components/TopNavBar/AdminCalendar";
import { AdminSettings } from "./components/TopNavBar/AdminSettings";
import PatientList from "./components/TopNavBar/AdminPatientList";
import AdminAppointmentList from "./components/TopNavBar/AdminAppointmentList";
import SuperAdmin from "./components/SuperAdmin";
import PatientCalendarView from "./components/PatientCalendarView";
import PatientAppointmentList from "./components/PatientAppointmentList";
import PatientPersonalInformation from './components/PatientPersonalInformation';
import { useState } from 'react';

export const ClinicContext = React.createContext(); // context API for Clinic Login
export const isClinicLoggedInContext = React.createContext(); 
export const SettingsContext = React.createContext(); // context API for Settings

export const PatientContext = React.createContext(); // context API for Patient Login
export const isPatientLoggedInContext = React.createContext();

// special declaration since may automated user and pass generation sa patient login
export const UserPassContext = React.createContext();

function App() {

    // variable declarations for context API Start

    // clinic login
    const [clinicid, setClinicID] = useState('');
    const [clinicpassword, setClinicPassword] = useState('');
    const [isClinicLoggedIn, setIsClinicLoggedIn] = useState(false);

    // clinic settings
    const [checkedAppointmentDeletion, setCheckedAppointmentDeletion] = useState(true);

    const handleAppointmentDeletionChange = (event) => {
        setCheckedAppointmentDeletion(event.target.checked);
    };
    
    const [checkedPatientDeletion, setCheckedPatientDeletion] = React.useState(true);

    const handlePatientDeletionChange = (event) => {
        setCheckedPatientDeletion(event.target.checked);
    };

    const [checkedAppointmentReschedule, setCheckedAppointmentReschedule] = React.useState(true);

    const handleAppointmentRescheduleChange = (event) => {
        setCheckedAppointmentReschedule(event.target.checked);
    };

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleCapacityChange = (event) => {
        setCapacity(event.target.value);
    };

    // patient login
    const [patientid, setPatientID] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);

    // patient sign up
    const [sex, setSex] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [email, setEmail] = useState('');
    const [facebookName, setFacebookName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');

    //special user and pass for patient login and sign up
    //const [userPass, setUserPass] = useState({ user: '', pass: '' });

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    // variable declarations for context API End


    // Router Start

    const router = createBrowserRouter([
        {
            path: '',
            element: <LandingPage />
        },
        
        {
            path: '/login/clinic',
            element: <LoginClinic />
        },

        {
            path: '/login/patient/signin',
            element: <LoginPatient />
        },
        {
            path: '/calendar',
            element: <Calendar />
        },

        // Start Receptionist Page Routes
        {
            path: "/admin-calendar-view",
            element: isClinicLoggedIn ? <CalendarView /> : <LoginClinic />
            // check if true ung nasa taas tapos proceed to calendarview, otherwise redirect to login
        },
        {   
            path: "/admin-settings",
            element: isClinicLoggedIn ? <AdminSettings /> : <LoginClinic />

        },
        {
            path: "/admin-appointments",
            element: isClinicLoggedIn ? <AdminAppointmentList /> : <LoginClinic />
        },
    
        {
            path: "/admin-patients",
            element: isClinicLoggedIn ? <PatientList /> : <LoginClinic />
        },
        {
            path: "superadmin",
            element: <SuperAdmin/>
        },

        // End Receptionist Page Routes

        // Start Patient Page Routes
        
        {
            path: "/patient-calendar-view",
            element: isPatientLoggedIn ? <PatientCalendarView /> : <LoginPatient />
        },

        {
            path: "/patient-personal-info",
            element: isPatientLoggedIn ? <PatientPersonalInformation /> : <LoginPatient />
        },

        { 
            path: "/patient-appointments",
            element: isPatientLoggedIn ? <PatientAppointmentList /> : <LoginPatient />
        },
        
        // End Patient Page Routes

    ])

    // Router End

    return (
        <SettingsContext.Provider value={{
            checkedAppointmentDeletion,
            handleAppointmentDeletionChange,
            checkedPatientDeletion,
            handlePatientDeletionChange,
            checkedAppointmentReschedule,
            handleAppointmentRescheduleChange,
            month, setMonth, year, setYear, capacity, setCapacity,
            handleMonthChange, handleYearChange, handleCapacityChange,
        }}> 
    <UserPassContext.Provider value={{ user, pass, setUser, setPass }}>
    <isClinicLoggedInContext.Provider value={{ isClinicLoggedIn, setIsClinicLoggedIn }}>
        <isPatientLoggedInContext.Provider value={{ isPatientLoggedIn, setIsPatientLoggedIn }}>
            <ClinicContext.Provider value={{ clinicid, setClinicID, clinicpassword, setClinicPassword }}>
            <PatientContext.Provider value={{
      patientid, setPatientID,
      firstName, setFirstName,
      middleName, setMiddleName,
      lastName, setLastName,
      hospitalNumber, sethospitalNumber,
      birthDate, setbirthDate,
      sex, setSex,
      civilStatus, setCivilStatus,
      email, setEmail,
      facebookName, setFacebookName,
      contactNumber, setContactNumber,
      address, setAddress,
    }}>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </PatientContext.Provider>
            </ClinicContext.Provider>
        </isPatientLoggedInContext.Provider>
    </isClinicLoggedInContext.Provider></UserPassContext.Provider></SettingsContext.Provider>
);
}

export default App;