import './LoginPatient.css';
import React, { useState } from 'react';
import axios from "axios";
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import LandingNavBar from './LandingNavBar';
import Button from '@mui/material/Button';
import doctor from '../assets/doctor.png';
import { MdKeyboardBackspace } from "react-icons/md";
import { useContext } from 'react';
import { ClinicContext, isClinicLoggedInContext } from '../App'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils/cookie';

function LoginClinic() {
    //const [clinicid, setClinicID] = useState('');
    //const [clinicpassword, setClinicPassword] = useState('');

    const { clinicid, setClinicID, clinicpassword, setClinicPassword } = useContext(ClinicContext);
    const { isClinicLoggedIn, setIsClinicLoggedIn } = useContext(isClinicLoggedInContext);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isClinicLoggedIn');

        if (isLoggedIn) {
            setIsClinicLoggedIn(true);
            navigate(PathConstants.ADMINCALENDARVIEW);
        }
    }, [navigate, setIsClinicLoggedIn]);

    const handleLogin = (event) => {
        event.preventDefault(); // para 'di magshow 'yung mga ilalagay na information sa URL

        if (clinicid === '' || clinicpassword === '') {
            alert('Please fill out all the fields.');
            return;
        }

        else {
            validateEntry();
        }
    }

    const validateEntry = async () => {
        try { 
          const csrftoken = getCookie('csrftoken');

          const login = await axios.post('http://localhost:8000/login', 
            { username: clinicid, password: clinicpassword },
            {
              headers: {
                'X-CSRFToken': csrftoken
              }
            }
          );
          
          if (login.status === 200) {
            sessionStorage.setItem('isClinicLoggedIn', true);
            sessionStorage.setItem('clinicid', clinicid);
            setIsClinicLoggedIn(true);
            alert('Login Successful');
            navigate(PathConstants.ADMINCALENDARVIEW);
          }
        } 
        catch (error) {
          console.error(error);
          alert('Login Failed! Please check your Clinic ID and Password.');
        }

    }

    return (
        <>
        <div class = 'LoginClinic'>
            <LandingNavBar/>
            <div class = 'login-wrapper'>
            <div class="login-pane">
            <img class='doctor-img2' src={doctor} alt='doctor image2' />
                <h1 class="login-title">I am a</h1>
                <h1 class="login-title3">PHYSICIAN</h1>
                <form className="login-form">
                    
                        <FormGroup>
                            <FormLabel class='label'>Clinic ID</FormLabel>
                            <FormControl 
                                type="number" 
                                placeholder="Clinic ID" 
                                name="clinic-id" 
                                className="user-field" 
                                value={clinicid}
                                onChange={(e) => setClinicID(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel class='label'>Password</FormLabel>
                            <FormControl 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                className="password-field" 
                                value={clinicpassword}
                                onChange={(e) => setClinicPassword(e.target.value)}
                            />
                        </FormGroup>

                            <Button className = 'login-button' 
                            variant="contained" 
                            color="success"
                            style={{marginTop: '2vh'}} // Adds a top margin of 5px
                            type="submit"
                            onClick={handleLogin}>
                                LOGIN
                            </Button>
                       
                        <Link to={PathConstants.LANDING}>  <p style = {{
                            color: 'Green',
                            fontSize: '2vh',
                            marginTop: '1vh',
                            marginLeft: '0.1vh'
                       
                        }}> <MdKeyboardBackspace /> Go back  </p> </Link> 
                    
                </form>
            </div>
            </div>
            </div>
           
        </>
    );
}

export default LoginClinic;