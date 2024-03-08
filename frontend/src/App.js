import './App.css';
import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';

function App() {

    const router = createBrowserRouter([
        
        {
            path: '',
            element: <LandingPage />
        },
        
        {
            path: '/login',
            element: <Login />
        },

        {
            path: '/calendar',
            element: <Calendar />
        },

        { 
            path: '/signup',
            element: <SignUp />
        }

    ])
    
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;