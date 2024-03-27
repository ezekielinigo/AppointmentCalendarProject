import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Calendar.css';
import { FiLock, FiUnlock, FiSave, FiTrash2 } from 'react-icons/fi';
// icon library here -> https://circumicons.com/icons

const AppointmentInfoModal = ({show, handleClose, appointment, setAppointment, editLock, handleEditLock, handleSave, handleDelete}) => {

    // creating the date label for the forms
    const date = appointment ? appointment.appointmentNumber : '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthString = months[parseInt(date.substring(2,4), 10) - 1];
    const dateLabel = monthString + " " +  date.substring(4,6) + ", " + date.substring(9,13);


    return (
        <Modal className="AppointmentInfoModal" show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title style={{fontSize: '22px'}}>
                Appointment Form for {dateLabel}
            </Modal.Title>
            <Button
                className="fc-button-primary"
                onClick={handleEditLock}>
                {editLock ? <FiUnlock /> : <FiLock />}
            </Button>
            <Button
                className="fc-button-primary"
                onClick={handleDelete}>
                <FiTrash2 />
            </Button>
            <Button
                className="fc-button-primary"
                onClick={handleSave}>
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
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.patient.nameFirst : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameFirst: e.target.value}})}
                            />
                            
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.patient.nameMiddle : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameMiddle: e.target.value}})}
                            />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                required
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.patient.nameLast : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, nameLast: e.target.value}})}
                            />
                            <Row>
                                <Col md={9}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="date"
                                        required
                                        readOnly={!editLock}
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
                                        disabled={!editLock}
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
                                        disabled={!editLock}
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
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.patient.email : ''}
                                onChange={e => setAppointment({...appointment, patient: {...appointment.patient, email: e.target.value}})}
                            />
                            <Form.Label>Facebook Name</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        required
                                        readOnly={!editLock}
                                        defaultValue={appointment ? appointment.patient.facebookName : ''}
                                        onChange={e => setAppointment({...appointment, patient: {...appointment.patient, facebookName: e.target.value}})}
                                    />
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={!editLock}
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
                                readOnly={!editLock}
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
                                    <Form.Label>Hospital No.</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="number"
                                        readOnly={!editLock}
                                        defaultValue={appointment ? appointment.patient.hospitalNumber : ''}
                                        onChange={e => {
                                            const isBlank = !e.target.value || e.target.value.trim() === '';
                                            setAppointment({...appointment, newPatient: true, patient: {...appointment.patient, hospitalNumber: e.target.value, newPatient: isBlank}})
                                        }}
                                    />
                                <Col md={8}>
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="New Patient"
                                        disabled={!editLock}
                                        defaultValue={appointment ? appointment.newPatient : ''}
                                    />
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="Follow-up"
                                        disabled={!editLock}
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
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.referralDoctor : ''}
                                onChange={e => setAppointment({...appointment, referralDoctor: e.target.value, followup: true})}
                            ></Form.Control>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                className="form-control "
                                as="textarea"
                                readOnly={!editLock}
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

export default AppointmentInfoModal;