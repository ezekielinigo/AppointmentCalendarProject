import './LoginPatient.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Switch from '@mui/material/Switch';
import { FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import LandingNavBar from './LandingNavBar';
import Button from '@mui/material/Button';
import patient from '../assets/patient.png';
import { Link } from 'react-router-dom';
import PathConstants from '../PathConstants';
import { MdKeyboardBackspace } from "react-icons/md";

function Login() {

    const [events, setEvents] = useState([]);
    const [hospitalNumberInput, setHospitalNumberInput] = useState(false);
    const [checked, setChecked] = useState(false); // for checkbox
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState('');

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#108942',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: '#108942',
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));

    // simple encryption function
    const shiftChar = (char) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // if the character is not alphanumeric, return it as it is
        return alphabet[(index + 5) % alphabet.length]; // shift the character 5 positions to the right
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
            alert (pass);
            //alert (user + " " + pass) // pang-debug since ayaw gumana ng tokenizing mechanism kanina

            // ito yung gumanang tokenizing mechanism

            // 1. attempt sign-up
            const response = await axios.post('http://localhost:8000/signup', { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast });
            
            // 2. basically status = 200 means na may existing username na sa database kaya login na  
            if (response.status === 200) {
                const login = await axios.post('http://localhost:8000/login', { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast });
                console.log(login);
            }

            // 3. other than 200, sign-up then login

            else {
                const signup = await axios.post('http://localhost:8000/signup', { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast })
                console.log(signup);
                const login = await axios.post('http://localhost:8000/login', { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast });
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
            alert("Please fill out all the fields.");
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
        <div class = 'LoginPatient'>
        <LandingNavBar/>
            <div class = 'login-wrapper'>
            <div class="login-pane">
            <img class='patient-img2' src={patient} alt='patient image' />
                <h1 className="login-title">I am a</h1>
                <h1 className="login-title2">PATIENT</h1>
                <form className="login-form">
                    <div className="form-and-names-container">
                        <FormGroup>
                            <FormLabel class='label'>First Name</FormLabel>
                            <div className='name-div'>
                                <FormControl
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <FormLabel class='label'>Middle Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Middle Name"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                                <FormLabel class='label'>Last Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </FormGroup>

                        <div className="form-group-container">
                            <FormGroup>
                                <FormLabel class='label'>Birthday</FormLabel>
                                <FormControl
                                    type="date"
                                    placeholder="Birthday"
                                    value={birthDate}
                                    onChange={(e) => setbirthDate(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel class='label'>Hospital Number</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Hospital Number"
                                    value={hospitalNumber}
                                    onChange={(e) => sethospitalNumber(e.target.value)}
                                    disabled={hospitalNumberInput}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel className='label'>I am a new patient</FormLabel>
                                <div className='switch-button-container'>
                                    <GreenSwitch
                                        onChange={handleHospitalBox}
                                        checked={checked}
                                    />
                                </div>
                            </FormGroup>
                           
                        </div>
                    </div>
                    

                    <Button 
                        type="submit" 
                        className="login-button"
                        onClick={handleValidation}
                        variant="contained" 
                        color="success"
                        style={{marginTop: '2vh'}} // Adds a top margin of 5px
                    >
                        PROCEED
                    </Button>
                </form>
                <Link to={PathConstants.LANDING}>  <p style = {{
                            color: 'Green',
                            fontSize: '2vh',
                            marginTop: '1vh',
                            marginLeft: '1.2vh'
                       
                        }}> <MdKeyboardBackspace /> Go back  </p> </Link> 
            </div>
            </div>
            </div>
            
            
        </>
    );
}

export default Login;