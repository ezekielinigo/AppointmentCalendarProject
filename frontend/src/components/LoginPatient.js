import './LoginPatient.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';

import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';

function Login() {

    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(true);
    const [hospitalNumberInput, setHospitalNumberInput] = useState(false);
    const [checked, setChecked] = useState(false); // for checkbox
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState('');

    const shiftChar = (char) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // If the character is not alphanumeric, return it as is
        return alphabet[(index + 5) % alphabet.length]; // Shift the character 5 positions to the right
    }

    const validateEntry = async () => {
        const patient = {
            nameFirst: firstName,
            nameLast: lastName,
            birthdate: birthDate,
            hospitalNumber: hospitalNumber
        };

        //alert(patient.birthdate + " " + patient.hospitalNumber + " " + patient.nameFirst + " " + patient.nameLast)
        
        try { 
            // session auth/token mechanism to

            // basically pre-defined username for the user using some of the details
            const user = (patient.nameFirst.slice(0, 2) + patient.nameLast.slice(0, 2) + patient.birthdate.replace(/-/g, '') + patient.hospitalNumber.slice(-4)).slice(0, 10);

            // password mula sa deets pero may shiftChar function para ma-encrypt
            const pass = (patient.nameLast.slice(-2) + patient.nameFirst.slice(0, 2) + patient.birthdate.replace(/-/g, '') + patient.nameLast + patient.nameFirst).split('').map(shiftChar).join('').slice(0, 10);
           
            //alert (user + " " + pass) // pang-debug since ayaw gumana ng tokenizing mechanism kanina

            // ito yung gumanang tokenizing mechanism

            // 1. attempt sign-up
            const response = await axios.post('http://localhost:8000/signup', { username: user, password: pass });
            
            // 2. basically status = 200 means na may existing username na sa database kaya login na  
            if (response.status === 200) {
                const login = await axios.post('http://localhost:8000/login', { username: user, password: pass });
                console.log(login);
            }

            // 3. other than 200, sign-up then login

            else {
                const signup = await axios.post('http://localhost:8000/signup', { username: user, password: pass })
                const login = await axios.post('http://localhost:8000/login', { username: user, password: pass });
                console.log(signup);
                console.log(login);
            } 
           
         } 

        catch (error) {
            console.error(error);
        }
        
    }

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
    
    if (!hospitalNumberInput) {
        if (firstName === '' || lastName === '' || birthDate === '' || hospitalNumber === '') {
            alert("Please fill in all the fields.");
        } 

        

        else {
            for (let i = 0; i < events.length; i++) {

                //alert(events[i].extendedProps.nameFirst + " " + events[i].extendedProps.nameLast + " " + events[i].extendedProps.birthdate + " " + events[i].extendedProps.hospitalNumber)
                //alert(firstName + " " + lastName + " " + birthDate + " " + hospitalNumber)

                if (events[i].extendedProps.nameFirst === firstName && 
                    events[i].extendedProps.nameLast === lastName && 
                    events[i].extendedProps.birthdate === birthDate && 
                    events[i].extendedProps.hospitalNumber === hospitalNumber) {
                    alert('Patient found! Redirecting to patient page...');
                    validateEntry();
                    return;
                } 

                else if (events[i].extendedProps.nameFirst === firstName && 
                    events[i].extendedProps.nameLast === lastName && 
                    events[i].extendedProps.birthdate === birthDate && 
                    events[i].extendedProps.hospitalNumber !== hospitalNumber) {
                    alert('Patient found! Hospital number does not match. Please check your inputs.');
                    return;
                } 
            }

            if (window.confirm("Patient not found. Do you want to register as a new patient?")) {
                alert("Redirecting to patient registration page...");
                return;
            }

        }
        
        
        /*
        else {
            const patient = {
                nameFirst: firstName,
                nameLast: lastName,
                birthdate: birthDate,
                hospitalNumber: hospitalNumber
            };
            axios.post(PathConstants.PATIENTS, patient)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
            setShow(false);
        } */ // tokenizing principle
    }

    else if (hospitalNumberInput) {
        if (firstName === '' || lastName === '' || birthDate === '') {
            alert("Please fill in all the fields.");
        } 

        else {
            for (let i = 0; i < events.length; i++) {

                //alert(events[i].extendedProps.nameFirst + " " + events[i].extendedProps.nameLast + " " + events[i].extendedProps.birthdate + " " + events[i].extendedProps.hospitalNumber)
                //alert(firstName + " " + lastName + " " + birthDate + " " + hospitalNumber)

                if (events[i].extendedProps.nameFirst === firstName && 
                    events[i].extendedProps.nameLast === lastName && 
                    events[i].extendedProps.birthdate === birthDate) {
                    alert('You already have a record on our database. Please input your hospital number.');
                    setChecked(false); // pang uncheck
                    setHospitalNumberInput(false); // pang enable ng text box
                    return;
                } 
            }

            if (window.confirm("Do you want to register as a new patient?")) {
                alert("Redirecting to patient registration page...");
                return;
            }

        }
    }
        
    }

    const handleHospitalBox = (event) => {
        setHospitalNumberInput(event.target.checked); // basically returns a boolean value to check kung nakacheck ba ung box.
        setChecked(event.target.checked); // for checkbox
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
                onChange={handleHospitalBox}
                checked={checked}> </Checkbox></h3>
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