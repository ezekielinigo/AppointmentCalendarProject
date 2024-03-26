/*

References:
Modal Component: https://react-bootstrap.netlify.app/docs/components/modal/ 
Buttons: https://react-bootstrap.netlify.app/components/buttons/
Routing: https://semaphoreci.com/blog/routing-layer-react
User Auth: https://www.youtube.com/watch?v=diB38AvVkHw

*/

import './App.css';
import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginClinic from './components/LoginClinic';
import LoginPatient from './components/LoginPatient';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import { CalendarView } from "./components/TopNavBar/AdminCalendar";
import { AdminSettings } from "./components/TopNavBar/AdminSettings";
import PatientList from "./components/TopNavBar/AdminPatientList";
import AdminAppointmentList from "./components/TopNavBar/AdminAppointmentList";
import SuperAdmin from "./components/SuperAdmin";


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

        { 
            path: 'login/patient/signup',
            element: <SignUp />
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
        }

    ])
    
    return (
        <><RouterProvider router={router}></RouterProvider></>

    );
}

export default App;