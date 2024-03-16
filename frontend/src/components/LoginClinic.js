
import './LoginClinic.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';

function Login() {


    const [show, setShow] = useState(true);

    const [clinicid, setClinicID] = useState('');
    const [clinicpassword, setClinicPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault(); // para 'di magshow 'yung mga ilalagay na information sa URL
        alert('Clinic ID: ' + clinicid + '\nPassword: ' + clinicpassword);


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
            <h1 className="login-title">Clinic Login</h1>
            <div className="login-pane">
                <form className="login-form">
                    <h3 className="login-title">Clinic ID</h3>
                    
                    <FormInput 
                    type="number" 
                    placeholder="Clinic ID" 
                    name="clinic-id" 
                    className="user-field" 
                    value = {clinicid}
                    onChange={(e) => setClinicID(e.target.value)}/>

                    <h3 className="login-title">Password</h3>

                    <FormInput 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    className="password-field" 
                    value = {clinicpassword}
                    onChange={(e) => setClinicPassword(e.target.value)}
                    />

                    <div className="button-container">
                        <button type="submit" className="login-button" onClick={handleLogin}>LOGIN</button>
                    </div>
                    <p1> Back? <Link to={PathConstants.LANDING}> Click here </Link> </p1>
                </form>
            </div>
            </div>
        </Modal>
        </>
    );
}

export default Login;