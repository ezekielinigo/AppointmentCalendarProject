import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg'
import Login from './Login';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const [show, setShow] = useState(true);

    const doctorHandler = () => {
        setShow(false);
        console.log("Doctor clicked");
    }

    const patientHandler = () => {
        setShow(false);
        console.log("Patient clicked");
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
                 
                            <Button className='btn' size='lg' variant="primary" onClick={patientHandler}>
                        I am a patient
                            </Button>
                       

                    <Link to={Login}>
                  
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