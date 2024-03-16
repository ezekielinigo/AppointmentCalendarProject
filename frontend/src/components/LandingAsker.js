import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';
import Logo from '../assets/hospital-logo.png';
import {Link} from 'react-router-dom';
import './LandingAsker.css';
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

            <Modal class = 'asker' size='lg' aria-labelledby='contained-modal-title-vcenter' centered='true' backdrop='static' show={show} onHide={() => setShow(false)} keyboard={false}>
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
                    Good day, patient! Please choose from the following:</Modal.Body>
                <Modal.Footer class='footer'>
                    <Link to={PathConstants.SIGNUPPATIENT}>
                        <Button className='asker-btn' size='lg' variant="primary" onClick={patientHandler}>
                            I would like to book an appointment
                        </Button> </Link>
                    
                        <Link to = {PathConstants.LOGINPATIENT}>
                        <Button className='asker-btn' size='lg' variant="primary" onClick={doctorHandler}>
                            I have an existing appointment
                        </Button>
                   </Link>
                
                </Modal.Footer>
                <p1 class = 'back-btn'> Back? <Link to={PathConstants.LANDING}> Click here </Link> </p1>
            </Modal>

            

        </div>
        

        
        </>

        
    
        
    );

    
}

export default LandingPage;

