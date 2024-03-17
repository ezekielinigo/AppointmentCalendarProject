import './LoginPatient.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';

function Login() {

    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [appointmentCode, setAppointmentCode] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments/');
            const appointments = response.data.map(appointment => {
                return {
                    title: appointment.appointmentNumber.substring(10,) + ' : ' + appointment.patient.nameLast + ', ' + appointment.patient.nameFirst[0] + '.',
                    extendedProps: {
                        nameFirst: appointment.patient.nameFirst,
                        nameLast: appointment.patient.nameLast,
                        appointmentNumber: appointment.appointmentNumber,
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
       
        if (firstName === '' || lastName === '' || appointmentCode === '') {
            alert('Please fill in all fields.');
        } 

        else {
            for (let i = 0; i < events.length; i++) {
                if (events[i].extendedProps.nameFirst === firstName && events[i].extendedProps.nameLast === lastName && events[i].extendedProps.appointmentNumber === appointmentCode) {
                    alert('Validation successful!');
                    return; // exit the loop and the function if a match is found
                }
            }

            alert('Validation failed. Please check your information.');

        }
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
                   
                    <h3 className="login-title">Name</h3>
                   
                    <div class = 'name-div'> 
                   
                    <FormInput type="text" placeholder="First Name" name="first-name" className="user-field"
                    value = {firstName} // set ung variable firstName, tas setFirstName ung function na magse-set ng value
                    onChange={(e) => setFirstName(e.target.value)} /> 

                    <FormInput type="text" placeholder="Last Name" name="last-name" className="user-field" 
                    value = {lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <h3 className="login-title">Appointment Code</h3>
                    <FormInput type="text" placeholder="Appointment Code" name="appointment-code" className="user-field" 
                    value = {appointmentCode}
                    onChange={(e) => setAppointmentCode(e.target.value)}/>

                    <div className="button-container">
                        <button type="submit" className="login-button" onClick = {handleValidation}>Validate</button>
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