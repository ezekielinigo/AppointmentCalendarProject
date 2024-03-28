import React, { useState, useEffect } from 'react';
import 'react-router-dom';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './SuperAdmin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils/cookie';

import NavBar from "./TopNavBar/AdminNavBar";

function SuperAdmin() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const username = window.prompt('Enter username');
        const password = window.prompt('Enter password');

        if (username === 'cacsuperadmin' && password === 'superadmin123') {
            setAuthenticated(true);
        } else {
            alert('Invalid credentials');
            navigate('/'); // Redirect to home page
        }
    }, []);

    if (!authenticated) {
        return null;
    }

    const handleAccountCreation = async() => {
    
        const clinicName = document.getElementById('clinic-name').value;
        const password = document.getElementById('password').value;
        const reenterPassword = document.getElementById('reenter-password').value;

        if (password !== reenterPassword) {
            alert('Passwords do not match');
            return;
        }

        else {
            const data = {
                clinicName: clinicName,
                password: password
            }

            const randomNumber = Math.floor(100000 + Math.random() * 900000);

            try { 
                const csrftoken = getCookie('csrftoken');
            
                const response = await axios.post('http://localhost:8000/signup', 
                    { 
                        username: randomNumber, 
                        password: data.password, 
                        first_name: data.clinicName, 
                        last_name: ''
                    },
                    {
                        headers: {
                            'X-CSRFToken': csrftoken
                        }
                    }
                );
            
                if (response.status === 200) {
                    console.log(response);
                    alert('Account successfully created for ' + data.clinicName + '. Your clinic id is ' + randomNumber + '. Please login to continue.');
                    window.location.href = '/login/clinic';
                } else {
                    console.error('Signup failed with status:', response.status);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <NavBar />

            <div class = 'box-2'> 

            <h1> Create Clinic Account</h1>

            <FormGroup> 
                <FormLabel> Clinic Name </FormLabel>
                <FormControl id ='clinic-name' type="text" placeholder="Enter Clinic Name" />

                <FormLabel> Password </FormLabel>
                <FormControl id = 'password' type="password" placeholder="Enter Password" />

                <FormLabel> Re-enter Password </FormLabel>
                <FormControl id = 'reenter-password' type="password" placeholder="Re-enter Password" />

                <Button class = 'create-acc' onClick = {handleAccountCreation}> Create Account </Button>
                
            </FormGroup>
            
            </div>
        </>
    );
}

export default SuperAdmin;