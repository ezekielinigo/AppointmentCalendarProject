import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import patient from '../assets/patient.png';
import doctor from '../assets/doctor.png';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import PathConstants from '../PathConstants';
import LandingNavBar from './LandingNavBar';

function LandingPage() {
    const [show, setShow] = useState(true);

    const doctorHandler = () => {
        setShow(false);
      
    }

    const patientHandler = () => {
        setShow(false);
        
    }

    return (
        <>   
        <LandingNavBar/>     

        <div className='LandingPage'>
            <div className="button-container">
                <Link to={PathConstants.LOGINPATIENT}>
                    <Button className='landing-btn' size='lg' variant="primary" onClick={patientHandler}>
                        <h2 class = 'desc'> I am a </h2>
                        <h1 class = 'role'> PATIENT </h1>
                        <img class='patient-img' src={patient} alt='patient image' />
                    </Button>
                </Link>

                <Link to={PathConstants.LOGINCLINIC}>
                    <Button className='landing-btn' size='lg' variant="primary" onClick={doctorHandler}>
                        <h2 class = 'desc'> I am a </h2>
                        <h1 class = 'role'> PHYSICIAN </h1>
                        <img class='doctor-img' src={doctor} alt='doctor image' />
                    </Button>
                </Link>
            </div>
        </div>
        
        </>

        
    
        
    );

    
}

export default LandingPage;

