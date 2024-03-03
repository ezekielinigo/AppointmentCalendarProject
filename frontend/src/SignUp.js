import './SignUp.css';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component without the file extension

function SignUp() {
    
    return (
        <div className="sign-up-pane">
            <form className="sign-up-form">
                <h3 className="login-title">Full Name</h3>
                <FormInput type="text" placeholder="First Name" name="firstlName" className="user-field" />
                <FormInput type="text" placeholder="Last Name" name="fullName" className="user-field" />
                <h3 className="login-title">Username</h3>
                <FormInput type="text" placeholder="Username" name="username" className="user-field" />
                <h3 className="login-title">Email</h3>
                <FormInput type="text" placeholder="Email" name="email" className="user-field" />
                <h3 className="login-title">Password</h3>
                <FormInput type="password" placeholder="Password" name="password" className="password-field" />
                <h3 className="login-title">Confirm Password</h3>
                <FormInput type="password" placeholder="Re-enter Password" name="password" className="password-field" />
                <h3 className="login-title">Cellphone Number</h3>
                <FormInput
                    type="text"
                    placeholder="Cellphone Number"
                    name="cellphoneNumber"
                    className="number-field"
                    maxLength={11}
                    pattern="09[0-9]{9}"
                />
                <div className="button-container">
                    <button type="submit" className="sign-up-button">SIGN UP</button>
                </div>
            </form>
        </div>
    );

}

export default SignUp;