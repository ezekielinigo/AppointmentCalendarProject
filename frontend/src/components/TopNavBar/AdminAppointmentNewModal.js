import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../Calendar.css';
import { FiSearch, FiSave } from 'react-icons/fi';
// icon library here -> https://circumicons.com/icons

const AppointmentNewModal = ({show, handleClose, appointment, setAppointment, handleSave}) => {

    // creating the date label for the forms
    const date = appointment ? appointment.appointmentNumber : '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthString = months[parseInt(date.substring(2,4), 10) - 1];
    const dateLabel = monthString + " " +  date.substring(4,6) + ", " + date.substring(9,13);

    // handler if new patient
    const [isNewPatient, setIsNewPatient] = React.useState(false);
    const handlePatientSearch = async () => {
        const hospitalNumber = appointment.patient.hospitalNumber;
        if (hospitalNumber === '' && !isNewPatient) {
            alert('Please enter hospital number');
        } else if (!/^\d{6}$/.test(hospitalNumber) && !isNewPatient) {
            alert('Hospital number must be 6 digits numeric only');
        } else {
            try {
                const response = await axios.get(`http://localhost:8000/api/patients/`);
                const patient = response.data.find(patient => patient.hospitalNumber === hospitalNumber);
                if (!patient) {
                    alert('Patient not found');
                } else {
                    setAppointment({
                        ...appointment,
                        patient: {
                            id: patient.id,
                            nameFirst: patient.nameFirst,
                            nameMiddle: patient.nameMiddle,
                            nameLast: patient.nameLast,
                            birthdate: patient.birthdate,
                            age: patient.age,
                            sex: patient.sex,
                            civilStatus: patient.civilStatus,
                            hospitalNumber: patient.hospitalNumber,
                            contact: patient.contact,
                            email: patient.email,
                            facebookName: patient.facebookName,
                            address: patient.address,
                        }
                    });
                }
            }catch (error) {
                console.error(error);
                return false;
            }
        }
    }


    return (
        <Modal className="AppointmentNewModal" show={show} onHide={() => {
            handleClose();
            setIsNewPatient(false);
        }}>
            <Modal.Header>
            <Modal.Title style={{fontSize: '22px'}}>
                Appointment Form for {dateLabel}
            </Modal.Title>
            <Button
                className="fc-button-primary"
                onClick={handleSave}
            >
                <FiSave />
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                required
                                readOnly={!isNewPatient}
                                defaultValue={appointment ? appointment.patient.nameFirst : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameFirst: e.target.value.toUpperCase()}})}
                            />

                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                readOnly={!isNewPatient}
                                defaultValue={appointment ? appointment.patient.nameMiddle : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameMiddle: e.target.value.toUpperCase()}})}
                            />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                required
                                readOnly={!isNewPatient}
                                defaultValue={appointment ? appointment.patient.nameLast : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameLast: e.target.value.toUpperCase()}})}
                            />
                            <Row>
                                <Col md={9}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="date"
                                        required
                                        readOnly={!isNewPatient}
                                        defaultValue={appointment ? appointment.patient.birthdate : ''}
                                        onChange={e => {
                                            const newAge = new Date().getFullYear() - new Date(e.target.value).getFullYear();
                                            setAppointment({...appointment, patient: {...appointment.patient, birthdate: e.target.value, age: newAge}});
                                        }}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={true}
                                        value={appointment ? appointment.patient.age : ''}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Select
                                        className="form-control "
                                        disabled={!isNewPatient}
                                        defaultValue={appointment ? appointment.patient.sex : ''}
                                        onChange={e => setAppointment({...appointment, patient: {...appointment.patient, sex: e.target.value}})}
                                    >
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Civil Status</Form.Label>
                                    <Form.Select
                                        className="form-control "
                                        disabled={!isNewPatient}
                                        defaultValue={appointment ? appointment.patient.civilStatus : ''}
                                        onChange={e => setAppointment({...appointment, patient: {...appointment.patient, civilStatus: e.target.value}})}
                                    >
                                        <option value="SINGLE">SINGLE</option>
                                        <option value="MARRIED">MARRIED</option>
                                        <option value="WIDOWED">WIDOWED</option>
                                        <option value="SEPARATED">SEPARATED</option>

                                    </Form.Select>
                                </Col>
                            </Row>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                required
                                readOnly={!isNewPatient}
                                defaultValue={appointment ? appointment.patient.email : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, email: e.target.value}})}
                            />
                            <Form.Label>Facebook Name</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        required
                                        readOnly={!isNewPatient}
                                        defaultValue={appointment ? appointment.patient.facebookName : ''}
                                        onChange={e => setAppointment({...appointment, patient: {...appointment.patient, facebookName: e.target.value}})}
                                    />
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={!isNewPatient}
                                        minLength={11}
                                        maxLength={11}
                                        defaultValue={appointment ? appointment.patient.contact : ''}
                                        onChange={e => {
                                            const isValid = /^\d{11}$/.test(e.target.value) || e.target.value === '';
                                            if (!isValid) {
                                                setAppointment({
                                                    ...appointment,
                                                    patient: {...appointment.patient, contact: e.target.value}
                                                })
                                            }
                                        }}
                                    />
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                className="form-control"
                                as="textarea"
                                required
                                readOnly={!isNewPatient}
                                rows={2}
                                defaultValue={appointment ? appointment.patient.address : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, address: e.target.value}})}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTextField">
                            <Row>
                            <Form.Label>Appointment No.</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={true}
                                        defaultValue={appointment ? appointment.appointmentNumber : ''}
                                    />
                                    <Col md={10}>
                                        <Form.Label>Hospital No.</Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            type="number"
                                            readOnly={isNewPatient}
                                            value={isNewPatient ? '' : (appointment ? appointment.patient.hospitalNumber : '')}
                                            onChange={e => {
                                                const isValid = /^\d+$/.test(e.target.value) || e.target.value === '';
                                                if (isValid) {
                                                    setAppointment({
                                                        ...appointment,
                                                        patient: {...appointment.patient, hospitalNumber: e.target.value}
                                                    })
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            className="fc-button-primary"
                                            onClick={handlePatientSearch}
                                        >
                                            <FiSearch />
                                        </Button>
                                    </Col>
                                <Col md={8}>
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="New Patient"
                                        disabled={false}
                                        defaultValue={appointment ? appointment.newPatient : ''}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setAppointment({
                                                    ...appointment,
                                                    newPatient: true,
                                                    patient: {
                                                        id: 0,
                                                        nameFirst: '',
                                                        nameMiddle: '',
                                                        nameLast: '',
                                                        birthdate: '',
                                                        age: '',
                                                        sex: '',
                                                        civilStatus: '',
                                                        hospitalNumber: '',
                                                        email: '',
                                                        facebookName: '',
                                                        contact: '',
                                                        address: ''
                                                    }
                                                });
                                            }else {
                                                setAppointment({
                                                    ...appointment,
                                                    newPatient: false
                                                })
                                            }
                                            setIsNewPatient(e.target.checked)
                                        }}
                                    />
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="Follow-up"
                                        disabled={false}
                                        checked={appointment ? appointment.followup : ''}
                                        onChange={e => setAppointment({...appointment, followup: e.target.checked})}
                                    />
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Row>
                            <Form.Label>Referral Doctor</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                maxLength={50}
                                readOnly={false}
                                defaultValue={appointment ? appointment.referralDoctor : ''}
                                onChange={e => setAppointment({...appointment, referralDoctor: e.target.value, followup: true})}
                            ></Form.Control>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                className="form-control "
                                as="textarea"
                                readOnly={false}
                                rows={14}
                                defaultValue={appointment ? appointment.remarks : ''}
                                onChange={e => setAppointment({...appointment, remarks: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AppointmentNewModal;