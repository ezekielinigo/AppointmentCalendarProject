
import './LoginPatient.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import SignUp from './SignUp';
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';

function Login() {


    const [show, setShow] = useState(true);

    const handleSignUp = () => {


    }



    return (
        <>
        <img src={background} alt='background' className='bg' style={{ 
            width: '100%', // trying to refactor sa .css but i'm not sure how, kaya rito na lang muna
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            backgroundAttachment: 'fixed', 
        }} />
        

        <Modal class = 'login-modal' size='lg' aria-labelledby='contained-modal-title-vcenter' centered='true' backdrop='static' show={show} onHide={() => setShow(false)} keyboard={false}> 
            <div className = "login-container">
            <div className="login-header">
                <img src={require("../assets/hospital-logo.png")} alt="Hospital Logo" className="hospital-logo" />
            </div>
            <h1 className="login-title">Please enter the following:</h1>
            <div className="login-pane">
                <form className="login-form">
                   
                    <h3 className="login-title">Full Name</h3>
                   
                    <div class = 'name-div'> 
                   
                    <FormInput type="text" placeholder="First Name" name="first-name" className="user-field" />
                    <FormInput type="text" placeholder="Last Name" name="last-name" className="user-field" />
                    </div>
                    <h3 className="login-title">Appointment Code</h3>
                    <FormInput type="text" placeholder="Appointment Code" name="appointment-code" className="user-field" />

                    <div className="button-container">
                        <button type="submit" className="login-button">Validate</button>
                    </div>
                </form>
                    <h3> Don't have an appointment? | <Link to={PathConstants.SIGNUPPATIENT}> Book here </Link> </h3> 
            </div>
            </div>
        </Modal>
        </>
    );
}

export default Login;