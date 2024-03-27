/*

References:
Modal Component: https://react-bootstrap.netlify.app/docs/components/modal/ 
Buttons: https://react-bootstrap.netlify.app/components/buttons/
Routing: https://semaphoreci.com/blog/routing-layer-react
User Auth: https://youtu.be/llrIu4Qsl7c?si=ioJtFl2n2GNsgIxH
Context: https://react.dev/reference/react/createContext, https://www.youtube.com/watch?v=sP7ANcTpJr8
MUI Material: https://mui.com/material-ui/getting-started/
Session Storage: https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
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

export const PatientContext = React.createContext(); // context API for Patient Login
export const isPatientLoggedInContext = React.createContext();

function App() {

    // variable declarations for context API Start

    // clinic login
    const [clinicid, setClinicID] = useState('');
    const [clinicpassword, setClinicPassword] = useState('');
    const [isClinicLoggedIn, setIsClinicLoggedIn] = useState(false);

    // patient login
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);

    //

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
    <isClinicLoggedInContext.Provider value={{ isClinicLoggedIn, setIsClinicLoggedIn }}>
        <isPatientLoggedInContext.Provider value={{ isPatientLoggedIn, setIsPatientLoggedIn }}>
            <ClinicContext.Provider value={{ clinicid, setClinicID, clinicpassword, setClinicPassword }}>
                <PatientContext.Provider value={{ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, hospitalNumber, sethospitalNumber, birthDate, setbirthDate }}>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </PatientContext.Provider>
            </ClinicContext.Provider>
        </isPatientLoggedInContext.Provider>
    </isClinicLoggedInContext.Provider>
);
}

export default App;