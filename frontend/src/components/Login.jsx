import './Login.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import SignUp from './SignUp';
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';

function Login() {

    const handleSignUp = () => {


    }

    return (
        <>
        
            <div className="login-header">
                <img src={require("../assets/hospital-logo.png")} alt="Hospital Logo" className="hospital-logo" />
            </div>
            <h1 className="login-title">Department of ______ Appointment System</h1>
            <div className="login-pane">
                <form className="login-form">
                    <h3 className="login-title">Username or Email</h3>
                    <FormInput type="text" placeholder="Username or Email" name="usernameOrEmail" className="user-field" />
                    <h3 className="login-title">Password</h3>
                    <FormInput type="password" placeholder="Password" name="password" className="password-field" />
                    <div className="button-container">
                        <button type="submit" className="login-button">LOGIN</button>
                        <h3 style={{ marginTop: '20px' }}> Don't have an account? </h3>
                        <Link to ={PathConstants.SIGNUP}>
                        <button type="button" className="sign-up-button" onClick={handleSignUp}>SIGN UP</button>
                        </Link>
                    </div>
                </form>
            </div>
    
        </>
    );
}

export default Login;