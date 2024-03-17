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
       
        if (firstName === '' || lastName === '' || birthDate === '' || hospitalNumber === '') {
            alert('Please fill in all fields.');
        } 

        else {
            
            /* for debugging purposes - ending, mali yung syntax sa for loop... extendedProps.hospitalNumberr xd
            alert('s' + events[2].extendedProps.nameFirst); 
            alert(firstName);

            alert('s' + events[2].extendedProps.nameLast);
            alert(lastName);

            alert('s' + events[2].extendedProps.hospitalNumber); 
            alert(hospitalNumber);
            
            alert('s' + events[2].extendedProps.birthdate);
            alert(birthDate); */

            
            for (let i = 0; i < events.length; i++) {
                if (events[i].extendedProps.nameFirst === firstName && 
                    events[i].extendedProps.nameLast === lastName && 
                    events[i].extendedProps.birthdate === birthDate &&
                    events[i].extendedProps.hospitalNumber === hospitalNumber) {

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

                    <h3 className="login-title">Birthday</h3>
                    <FormInput type="date" placeholder="Birthday" name="birthday" className="user-field" 
                    value = {birthDate}
                    onChange={(e) => setbirthDate(e.target.value)}/>

                    <h3 className="login-title">Hospital Number</h3>
                    <FormInput type="text" placeholder="Hospital Number" name="hospital-number" className="user-field" 
                    value = {hospitalNumber}
                    onChange={(e) => sethospitalNumber(e.target.value)}/>

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