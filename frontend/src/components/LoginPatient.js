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
import { useContext } from 'react';
import { PatientContext, isPatientLoggedInContext, UserPassContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils/cookie';
import Modal from 'react-bootstrap/Modal';


function LoginPatient() {

    const [events, setEvents] = useState([]);
    const [hospitalNumberInput, setHospitalNumberInput] = useState(false);
    const [checked, setChecked] = useState(false); // for switch
    const { setUser, setPass } = useContext(UserPassContext);
    
    const csrftoken = getCookie('csrftoken');
    
    /*
    
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [hospitalNumber, sethospitalNumber] = useState('');
    const [birthDate, setbirthDate] = useState(''); 
    
    */

    // logged in checker
    const { 
        firstName, setFirstName, 
        middleName, setMiddleName, 
        lastName, setLastName, 
        hospitalNumber, sethospitalNumber, 
        birthDate, setbirthDate,
        sex, setSex,
        civilStatus, setCivilStatus,
        email, setEmail,
        facebookName, setFacebookName,
        contactNumber, setContactNumber,
        address, setAddress,
        patientID, setPatientID,
    } = useContext(PatientContext);

    const { isPatientLoggedIn, setIsPatientLoggedIn } = useContext(isPatientLoggedInContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isPatientLoggedIn');

        if (isLoggedIn) {
            setIsPatientLoggedIn(true);
            navigate(PathConstants.PATIENTCALENDAR);
        }
    }, [navigate, setIsPatientLoggedIn]);

    // new patient declarations for modal
    const [showModal, setShowModal] = useState(false);
    const [isNewPatient, setIsNewPatient] = useState(false);


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
            nameMiddle: middleName,
            nameLast: lastName,
            birthdate: birthDate,
            hospitalNumber: hospitalNumber
        };

        // alert for above
        //alert(patient.nameFirst + " " + patient.nameLast + " " + patient.birthdate + " " + patient.hospitalNumber)

        //alert(patient.birthdate + " " + patient.hospitalNumber + " " + patient.nameFirst + " " + patient.nameLast)
        
        try { 
            // session auth/token mechanism to

            // basically pre-defined username for the user using some of the details
            const user = (patient.nameFirst.slice(0, 4) + patient.nameMiddle.slice(0, 2) + patient.nameLast.slice(0, 4) + patient.birthdate.replace(/-/g, '')).slice(0, 10);
            // password mula sa deets pero may shiftChar function para ma-encrypt
            const pass = (patient.nameLast.slice(-2) + patient.nameFirst.slice(0, 2) + patient.birthdate.replace(/-/g, '') + patient.nameLast + patient.nameFirst).split('').map(shiftChar).join('').slice(0, 10);
            
            // setUserPass({ user, pass });
            setUser(user);
            setPass(pass);
            
            //alert (pass);
            //alert (user + " " + pass) // pang-debug since ayaw gumana ng tokenizing mechanism kanina

            const login = await axios.post('http://localhost:8000/login', 
                { username: user, password: pass },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );

            console.log(login);
            sessionStorage.setItem('isPatientLoggedIn', true);
            setIsPatientLoggedIn(true);
            navigate(PathConstants.PATIENTCALENDAR);
        }

        // ito yung gumanang tokenizing mechanism (PRIOR NUNG PREDEFINED PA LANG UNG USER (OR ORIGINALLY GINAWA SA BACKEND))
        /*
        // 1. attempt sign-up
        const response = await axios.post('http://localhost:8000/signup', 
            { username: user, password: pass, first_name: firstName, last_name: lastName },
            {
                headers: {
                    'X-CSRFToken': csrftoken
                }
            }
        ); 
        
        // 2. basically status = 200 means na may existing username na sa database kaya login na  
        if (response.status === 200) {
            const login = await axios.post('http://localhost:8000/login', 
                { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );
            console.log(login);
            sessionStorage.setItem('isPatientLoggedIn', true);
            navigate(PathConstants.PATIENTCALENDAR);
        }

        // 3. other than 200, sign-up then login
        else {
            const signup = await axios.post('http://localhost:8000/signup', 
                { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );
            console.log(signup);

            const login = await axios.post('http://localhost:8000/login', 
                { username: user, password: pass, first_name: patient.nameFirst, last_name: patient.nameLast },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );
            console.log(login);
            sessionStorage.setItem('isPatientLoggedIn', true);
            navigate(PathConstants.PATIENTCALENDAR);
        } 
    } */

    catch (error) {
        console.error(error);
        //alert(error);
        alert('Login Failed! Please check your Patient ID and Password.');
    }
        
    }

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/patients/');
            const patients = response.data.map(patient => {

                if (patient.nameFirst === firstName && 
                        patient.nameLast === lastName && 
                        patient.birthdate === birthDate && 
                        patient.hospitalNumber === hospitalNumber) {
                    setPatientID(patient.id);
                    console.log(patient.id)
                };

                return {
                    title: patient.nameLast + ', ' + patient.nameFirst[0] + '.',
                    patientIdentifierFromAppointment: {
                        nameFirst: patient.nameFirst,
                        nameLast: patient.nameLast,
                        birthdate: patient.birthdate,
                        hospitalNumber: patient.hospitalNumber,
                    }
                };
            });
            setEvents(patients);
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
        if (firstName === '' || lastName === '' || birthDate === '') {
            alert("Please fill out all the fields.");
        } 

        else {
            for (let i = 0; i < events.length; i++) {
                //alert(events[i].patientIdentifierFromAppointment.nameFirst + " " + events[i].patientIdentifierFromAppointment.nameLast + " " + events[i].patientIdentifierFromAppointment.birthdate + " " + events[i].patientIdentifierFromAppointment.hospitalNumber)
                //alert(firstName + " " + lastName + " " + birthDate + " " + hospitalNumber)


                //alert(events[i].patientIdentifierFromAppointment.hospitalNumber + "|" + "input hospital num:" + hospitalNumber + 'e');

                if (events[i].patientIdentifierFromAppointment.nameFirst === firstName && 
                    events[i].patientIdentifierFromAppointment.nameLast === lastName && 
                    events[i].patientIdentifierFromAppointment.birthdate === birthDate &&
                    events[i].patientIdentifierFromAppointment.hospitalNumber === hospitalNumber) {

                        alert('Patient found! Redirecting to patient page...');
                        validateEntry();
                        return;
                }

                else if (events[i].patientIdentifierFromAppointment.nameFirst === firstName && 
                    events[i].patientIdentifierFromAppointment.nameLast === lastName && 
                    events[i].patientIdentifierFromAppointment.birthdate === birthDate && 
                    events[i].patientIdentifierFromAppointment.hospitalNumber === '') {
                    
        
                    alert('Patient found! Redirecting to patient page...');
                    validateEntry();
                    return;
                }

                else if (events[i].patientIdentifierFromAppointment.nameFirst === firstName && 
                    events[i].patientIdentifierFromAppointment.nameLast === lastName && 
                    events[i].patientIdentifierFromAppointment.birthdate === birthDate && 
                    events[i].patientIdentifierFromAppointment.hospitalNumber !== hospitalNumber) {
                    alert('Patient found! Hospital number does not match. Please check your inputs.');
                    return;
                } 

                else if (events[i].patientIdentifierFromAppointment.nameFirst === firstName && 
                    events[i].patientIdentifierFromAppointment.nameLast === lastName && 
                    events[i].patientIdentifierFromAppointment.birthdate !== birthDate) {
                    alert('Patient found! Birthday does not match. Please check your inputs.');
                    return;
                }

            }

                    if (window.confirm("Patient not found. Do you want to register as a new patient?")) {
                        handleSignUpModal();
                        return;
                    }

            
        }
    }

    else if (hospitalNumberInput) {
        if (firstName === '' || lastName === '' || birthDate === '') {
            alert("Please fill out all the fields.");
        } 

        else {
            for (let i = 0; i < events.length; i++) {

                //alert(events[i].patientIdentifierFromAppointment.nameFirst + " " + events[i].patientIdentifierFromAppointment.nameLast + " " + events[i].patientIdentifierFromAppointment.birthdate + " " + events[i].patientIdentifierFromAppointment.hospitalNumber)
                //alert(firstName + " " + lastName + " " + birthDate + " " + hospitalNumber)

                if (events[i].patientIdentifierFromAppointment.nameFirst === firstName && 
                    events[i].patientIdentifierFromAppointment.nameLast === lastName && 
                    events[i].patientIdentifierFromAppointment.birthdate === birthDate) {
                    alert('You already have a record on our database. Please input your hospital number.');
                    setChecked(false); // pang uncheck
                    setHospitalNumberInput(false); // pang enable ng text box
                    return;
                } 
            }

            if (window.confirm("You are registering as a new patient. Please fill in all the required details on the pop-up. Do you want to proceed?")) {
                handleSignUpModal();
                return;
            }

        }
    }
        
    }

    const handleSignUpModal = async () => { // for new patient modal pop-up
        setShowModal(true);
        
    }

    const handleProceedSignUp = async () => {

        const user = (firstName.slice(0, 4) + middleName.slice(0, 2) + lastName.slice(0, 4) + birthDate.replace(/-/g, '')).slice(0, 10);
            // password mula sa deets pero may shiftChar function para ma-encrypt
        const pass = (lastName.slice(-2) + firstName.slice(0, 2) + birthDate.replace(/-/g, '') + lastName + firstName).split('').map(shiftChar).join('').slice(0, 10);
        
        //setUserPass({ user, pass });

        setUser(user);
        setPass(pass);

        //alert(user + " " + pass);
        // alert(patient.nameFirst + " " + patient.nameMiddle + " " + patient.nameLast); ok hindi pala defined within the scope yung patient

            const response = await axios.post('http://localhost:8000/signup', 
            { username: user, password: pass, first_name: firstName, last_name: lastName },
            {
                headers: {
                    'X-CSRFToken': csrftoken
                }
            }
            
        );

        console.log(response);

        try {
            
        if (response.status === 200) {
            const newPatientInformation = {
                nameFirst: firstName,
                nameMiddle: middleName,
                nameLast: lastName,
                birthdate: birthDate,
                gender: sex,
                civilStats: civilStatus,
                contact: contactNumber,
                emailAddress: email,
                facebook: facebookName,
                homeAddress: address,
            }
    
            /*alert(newPatientInformation.nameFirst + " " + newPatientInformation.nameMiddle + " " + 
            newPatientInformation.nameLast + " " + newPatientInformation.birthdate + " " + newPatientInformation.gender + " " + newPatientInformation.civilStats + " " +
            newPatientInformation.contact + " " + newPatientInformation.emailAddress + " " + newPatientInformation.facebook + " " + newPatientInformation.homeAddress);
            */

            await axios.post('http://localhost:8000/api/patients/', {
            nameFirst: newPatientInformation.nameFirst,
            nameMiddle: newPatientInformation.nameMiddle,
            nameLast: newPatientInformation.nameLast,
            birthdate: newPatientInformation.birthdate,
            sex: newPatientInformation.gender,
            civilStatus: newPatientInformation.civilStats,
            hospitalNumber: '',
            contact: newPatientInformation.contact,
            email: newPatientInformation.emailAddress,
            facebookName: newPatientInformation.facebook,
            address: newPatientInformation.homeAddress,
        });
            alert('Patient registered successfully! Redirecting to patient page...');
            
            //alert(user + " " + pass);
            
            const login = await axios.post('http://localhost:8000/login', 
                { username: user, password: pass },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );

            setShowModal(false);

            console.log(login);
            sessionStorage.setItem('isPatientLoggedIn', true);
            setIsPatientLoggedIn(true);
            navigate(PathConstants.PATIENTCALENDAR);
        } 
        }
        catch (error) {
            console.error(error);
            alert(error);
            alert('Something went wrong during sign-up. Please try again.');

        }
            

    }

    /*
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } 
        
        else if (!showModal) {
            navigate(PathConstants.PATIENTCALENDAR);
        }
    }, [showModal]); */

    const handleHospitalBox = (event) => {
        setHospitalNumberInput(event.target.checked); // basically returns a boolean value to check kung nakacheck ba ung box.
        setChecked(event.target.checked); // for checkbox
    };

    const [age, setAge] = useState(null);

    const calculateAge = (birthDate) => {
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      return age;
    };

    useEffect(() => {
        setAge(calculateAge(birthDate));
      }, [birthDate]);
    
    return (
        <>

<Modal class = 'newPatientModal' show = {showModal}
    onHide = {() => setShowModal(false)}
     >
        <div class='container'>
        <img class='patient-img3' src={patient} alt='patient clipart' />
                <h1 className="modal-new-patient1">I am a</h1>
                <h1 className="modal-new-patient2">NEW PATIENT</h1>
            <FormGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '45%' }}>
                        <FormLabel>First Name</FormLabel>
                        <FormControl id='nameFirst' type="text" readOnly value = {firstName}/>

                        <FormLabel>Middle Name</FormLabel>
                        <FormControl id='nameMiddle' type="text" readOnly value = {middleName} />

                        <FormLabel>Last Name</FormLabel>
                        <FormControl id='nameLast' type="text" readOnly value = {lastName}/>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '60%' }}>
                                <FormLabel>Birthdate</FormLabel>
                                <FormControl id='birthdate' type='date' value = {birthDate} readOnly onChange={(e) => setbirthDate(e.target.value)} />
                            </div>
                            <div style={{ width: '35%' }}>
                                <FormLabel>Age</FormLabel>
                                <FormControl id='age' type='number' value = {age} readOnly />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '45%' }}>
                                <FormLabel>Sex</FormLabel>
                                <FormControl as="select" id='sex' onChange={(e) => setSex(e.target.value)} >
                                    <option value=''>Select...</option>
                                    <option value='MALE'>MALE</option>
                                    <option value='FEMALE'>FEMALE</option>
                                </FormControl>
                            </div>
                            <div style={{ width: '45%' }}>
                                <FormLabel>Civil Status</FormLabel>
                                <FormControl as="select" id='civilStatus' onChange={(e) => setCivilStatus(e.target.value)} >
                                    <option value=''>Select...</option>
                                    <option value='SINGLE'>SINGLE</option>
                                    <option value='MARRIED'>MARRIED</option>
                                    <option value='WIDOWED'>WIDOWED</option>
                                    <option value='SEPARATED'>SEPARATED</option>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '45%' }}>
                        <FormLabel>Hospital Number</FormLabel>
                        <FormControl id='hospitalNumber' type="number" readOnly />

                        <FormLabel>Email</FormLabel>
                        <FormControl id='email' type="text" onChange={(e) => setEmail(e.target.value)} />

                        <FormLabel>Facebook Name</FormLabel>
                        <FormControl id='facebookName' type="text" onChange={(e) => setFacebookName(e.target.value)} />

                        <FormLabel>Contact No.</FormLabel>
                        <FormControl id='contactNumber' type='number' onChange={(e) => setContactNumber(e.target.value)} style={{
                            '-moz-appearance': 'textfield',
                            'appearance': 'textfield'
                        }} onWheel={(e) => e.preventDefault()} />
                        <style jsx>{`
                            input::-webkit-outer-spin-button,
                            input::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                        `}</style>
                        <FormLabel>Address</FormLabel>
                        <FormControl id='address' as='textarea' rows='3' onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
            </FormGroup>
            <Button 
                        type="submit" 
                        className="login-button"
                        onClick={handleProceedSignUp}
                        variant="contained" 
                        color="success"
                        style={{marginTop: '2vh', marginBottom: '2vh'}}
                    >
                        PROCEED TO SIGN UP
                    </Button>
        </div>
    </Modal>

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

export default LoginPatient;