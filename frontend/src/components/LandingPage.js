import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';
import Logo from '../assets/hospital-logo.png';
import Login from './LoginClinic';
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
                    <Link to={PathConstants.LOGINPATIENT}>
                        <Button className='landing-btn' size='lg' variant="primary" onClick={patientHandler}>
                            I am a patient
                        </Button> </Link>
                    
                        <Link to = {PathConstants.LOGINCLINIC}>
                        <Button className='landing-btn' size='lg' variant="primary" onClick={doctorHandler}>
                            I am a physician
                        </Button>
                   </Link>


                </Modal.Footer>
            </Modal>

            

        </div>
        

        
        </>

        
    
        
    );

    
}

export default LandingPage;

