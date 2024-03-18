import './LoginPatient.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';

import Checkbox from '@mui/material/Checkbox';

function Login() {

    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(true);
    const [hospitalNumberInput, setHospitalNumberInput] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments/');
            const appointments = response.data.map(appointment => {
                return {
                    title: appointment.appointmentNumber.substring(10,) + ' : ' + appointment.patient.nameLast + ', ' + appointment.patient.nameFirst[0] + '.',
                    extendedProps: {
                        nameFirst: appointment.patient.nameFirst,
                        nameLast: appointment.patient.nameLast,
                        birthdate: appointment.patient.birthdate,
                        hospitalNumber: appointment.patient.hospitalNumber,
                    }
                };
            });
            setEvents(appointments);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
            fetchEvents();
        }, []);

    const handleValidation= (event) => {
        event.preventDefault(); // para 'di magshow 'yung mga ilalagay na information sa URL
    
        
    }

    const handleHospitalBox = (event) => {
        setHospitalNumberInput(event.target.checked); // basically returns a boolean value to check kung nakacheck ba ung box.
    };

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
                <h3> Are you a new patient? <Checkbox 
                onChange={handleHospitalBox}> </Checkbox></h3>
                    <h3 className="login-title">Name</h3>
                   
                    <div class = 'name-div'> 
                   
                    <FormInput type="text" placeholder="First Name" name="first-name" className="user-field"
                    value = {firstName} // set ung variable firstName, tas setFirstName ung function na magse-set ng value
                    onChange={(e) => setFirstName(e.target.value)} /> 

                    <FormInput type="text" placeholder="Last Name" name="last-name" className="user-field" 
                    value = {lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <h3 className="login-title">Birthday</h3>
                    <FormInput type="date" placeholder="Birthday" name="birthday" className="user-field" 
                    value = {birthDate}
                    onChange={(e) => setbirthDate(e.target.value)}/>

                    <h3 className="login-title">Hospital Number</h3>
                    <FormInput type="text" placeholder="Hospital Number" name="hospital-number" className="user-field" 
                    value={hospitalNumber}
                    onChange={(e) => sethospitalNumber(e.target.value)}
                    disabled={hospitalNumberInput}
                    
                     />
                    
                    <div className="button-container">
                        <button type="submit" className="login-button" onClick = {handleValidation}>Proceed</button>
                    </div>
                </form>
                
            </div>
            </div>
        </Modal>
        </>
    );
}

export default Login;