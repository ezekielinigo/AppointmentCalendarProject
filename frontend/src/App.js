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
import ReceptionistPage from './components/ReceptionistPage';
import SignUp from './components/SignUp';

import Sidebar from "./components/sidebar/Sidebar";

import {
    CalendarView,
} from "./components/sidebar/AdminCalendar";
import {
    Services,
    ServicesOne,
    ServicesTwo,
    ServicesThree,
} from "./components/sidebar/AdminAppointments";
import PatientList from "./components/sidebar/AdminPatientList";


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

        {
            path: 'admin/clinic-view',
            element: <ReceptionistPage />
        },

        // Start Receptionist Page Routes
        {
            path: "/admin-calendar-view",
            element: <CalendarView />
        },
        {
            path: "/admin-appointments",
            element: <Services />
        },
        {
            path: "/admin-patients",
            element: <PatientList />
        },
    ])
    
    return (
        <><RouterProvider router={router}></RouterProvider></>

    );
}

export default App;