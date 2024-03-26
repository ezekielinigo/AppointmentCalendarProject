/*

References:
Modal Component: https://react-bootstrap.netlify.app/docs/components/modal/ 
Buttons: https://react-bootstrap.netlify.app/components/buttons/
Routing: https://semaphoreci.com/blog/routing-layer-react
User Auth: https://youtu.be/llrIu4Qsl7c?si=ioJtFl2n2GNsgIxH

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

function App() {

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
            element: <CalendarView />
        },
        {   
            path: "/admin-settings",
            element: <AdminSettings />

        },
        {
            path: "/admin-appointments",
            element: <AdminAppointmentList />
        },
    
        {
            path: "/admin-patients",
            element: <PatientList />
        },
        {
            path: "superadmin",
            element: <SuperAdmin/>
        },

        // End Receptionist Page Routes

        // Start Patient Page Routes
        
        {
            path: "/patient-calendar-view",
            element: <PatientCalendarView />
        },

        {
            path: "/patient-personal-info",
            element: <PatientPersonalInformation />
        },

        { 
            path: "/patient-appointments",
            element: <PatientAppointmentList />
        }
        // End Patient Page Routes

    ])
    
    return (
        <><RouterProvider router={router}></RouterProvider></>

    );
}

export default App;