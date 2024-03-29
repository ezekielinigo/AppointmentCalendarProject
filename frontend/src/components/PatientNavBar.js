/* RMC COLOR PALETTE
text green: #056839
dark green: #108942
green: #3ab149
light green: #72b844
yellow green: #b5d333
white: whitesmoke
black: #071108
 */

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import "./NavBar.css";
import logo from "../assets/rmc-logo.png";
import { Button } from "react-bootstrap";
import { PatientContext, isPatientLoggedInContext, UserPassContext } from '../App';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../PathConstants';
import axios from 'axios';
import { getCookie } from './utils/cookie';

const Nav = styled.div`
	background: #071108;
	height: 80px;
	display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PatientNavBar = () => {
	const { firstName, setFirstName } = useContext(PatientContext);
    const { isPatientLoggedIn, setIsPatientLoggedIn} = useContext(isPatientLoggedInContext);
    const { user, pass, setUser, setPass } = useContext(UserPassContext);
    const navigate = useNavigate();

    useEffect(() => {
        // check if the data exists in sessionStorage
        if (sessionStorage.getItem('firstName')) {
            // if the data exists, use it to set the state
            setFirstName(sessionStorage.getItem('firstName'));
        }
    }, []);

    useEffect(() => {
        // whenever firstName changes, save it to sessionStorage
        sessionStorage.setItem('firstName', firstName);
        //alert(firstName);
    }, [firstName]);

    // retrieve user and pass from sessionStorage when the component mounts
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedPass = sessionStorage.getItem('pass');

        if (storedUser) {
            setUser(storedUser);
        }

        if (storedPass) {
            setPass(storedPass);
        }

    }, []);    

    // save user and pass to sessionStorage whenever they change
    useEffect(() => {
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('pass', pass);
    }, [user, pass]);

    const handleLogout = async () => {
        try {
            const csrftoken = getCookie('csrftoken');

            //alert(user + " " + pass);
        
            const response = await axios.post('http://localhost:8000/logout', {
                username: user,
                password: pass,
            }, {
                headers: {
                    'X-CSRFToken': csrftoken
                }
            });
        
            if (response.status === 200) {
                sessionStorage.removeItem('isPatientLoggedIn');
                sessionStorage.removeItem('firstName');
                setIsPatientLoggedIn(false);
                alert("You have been logged out successfully. Redirecting to login page.");
                navigate(PathConstants.LOGINPATIENT);
            } else {
                console.error('Failed to log out on the server');
            }
        } catch (error) {
            //alert("error logging out");
            //alert(userPass.user + " " +  userPass.pass);
            console.error('Failed to log out', error);
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: "whitesmoke" }}>
                <Nav>
                    <img style = {{ 
                        margin: 10, width: 70, height: 70 
                    }}
                    
                    src={logo}/>
                    <h1 className="header-title">
                        RMC Clinic Appointment Calendar
                    </h1>

                    {isPatientLoggedIn && 
                    
                    <><h2 className='welcome'> Welcome, {firstName} </h2><Button variant="outline-light" onClick={handleLogout} style={{
                            margin: 10,
                            alignItems: 'right'
                        }}> Log Out </Button></>
                    }

                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default PatientNavBar;