import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg'
import Login from './Login';
import { Routes, Route, Link} from 'react-router-dom';
import './LandingPage.css';
import PathConstants from '../PathConstants';

function LandingPage() {
    const [show, setShow] = useState(true);

    const doctorHandler = () => {
        setShow(false);
    }

    const patientHandler = () => {
        setShow(false);

    }

    return (
        
        <div class = 'LandingPage'>
            <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered='true' backdrop='static' 
            show={show} onHide={() => setShow(false)} keyboard={false}>
                <Modal.Header closeButton={false}>
                    <Modal.Title class = 'title'>Welcome to RMC Clinic Appointment Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body class = 'body'>Please choose from the following:</Modal.Body>
                <Modal.Footer class = 'footer'>
                            <Link to = {PathConstants.CALENDAR}> 
                            <Button className='btn' size='lg' variant="primary" onClick={patientHandler}>
                        I am a patient
                            </Button> </Link>
                        <Link to = {PathConstants.LOGIN}>
                        <Button className='btn' size='lg' variant="primary" onClick={doctorHandler}>
                            I am a physician
                        </Button>
                        </Link>
                  
        
                  
                </Modal.Footer>
            
            </Modal>
        
        </div>
    
        
    );
}

export default LandingPage;