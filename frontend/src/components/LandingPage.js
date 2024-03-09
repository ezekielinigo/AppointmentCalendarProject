import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';
import Logo from '../assets/hospital-logo.png';
import Login from './Login';
import { Routes, Route, Link} from 'react-router-dom';
import './LandingPage.css';
import PathConstants from '../PathConstants';
import FormInput from './FormInput';

function LandingPage() {
    const [show, setShow] = useState(true);

    const doctorHandler = () => {
        setShow(false);
        
    }

    const patientHandler = () => {
        setShow(false);
        

    }

    return (
        <><img src={background} alt='background' className='bg' style={{ 
            width: '100%', // trying to refactor sa .css but i'm not sure how, kaya rito na lang muna
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            backgroundAttachment: 'fixed', 
        }} /> 
        
        
        <div class='LandingPage'>

            <Modal class = 'landing' size='lg' aria-labelledby='contained-modal-title-vcenter' centered='true' backdrop='static' show={show} onHide={() => setShow(false)} keyboard={false}>
                <Modal.Header closeButton={false} class = 'header'>

    

                    <Modal.Title class='title'> 
                    
                    <img src={Logo} alt='Logo' className='bg' style={{ 
                    width: '80%', 
                    height: '80%',
                    flexDirection: 'row',

                }} />
                    
                    Welcome to RMC Clinic Appointment Calendar </Modal.Title> 
                </Modal.Header>
                <Modal.Body class='body'>
                    Please choose from the following:</Modal.Body>
                <Modal.Footer class='footer'>
                    <Link to={PathConstants.CALENDAR}>
                        <Button className='btn' size='lg' variant="primary" onClick={patientHandler}>
                            I am a patient
                        </Button> </Link>
                    
                    <Link to={PathConstants.LOGIN}>
                        <Button className='btn' size='lg' variant="primary" onClick={doctorHandler}>
                            I am a physician
                        </Button>
                    </Link>


                </Modal.Footer>
            </Modal>

            

        </div></>
    
        
    );
}

export default LandingPage;

/* 
            if $modal1.modal('show') {
                <Modal id = 'modal1' class ='login' size='lg' aria-labelledby='contained-modal-title-vcenter' centered='true' backdrop='static' show={false} onHide={() => setShow(false)} keyboard={false}>
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
                    </div>
                </form>
            </div>
            </Modal>
            }

            else {
               
            }
*/