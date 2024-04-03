import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Calendar.css';
import { FiSave } from 'react-icons/fi';
// icon library here -> https://circumicons.com/icons

const AppointmentNewModal = ({show, handleClose, appointment, patient, setAppointment, handleSave}) => {

    // creating the date label for the forms
    const date = appointment ? appointment.appointmentNumber : '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthString = months[parseInt(date.substring(2,4), 10) - 1];
    const dateLabel = monthString + " " +  date.substring(4,6) + ", " + date.substring(9,13);

    return (
        <Modal className="AppointmentNewModal" show={show} onHide={handleClose}>
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
                                readOnly={true}
                                defaultValue={patient ? patient.nameFirst : ''}
                            />

                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                readOnly={true}
                                defaultValue={patient ? patient.nameMiddle : ''}
                            />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className="form-control "
                                type="text"
                                required
                                readOnly={true}
                                defaultValue={patient ? patient.nameLast : ''}
                            />
                            <Row>
                                <Col md={9}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="date"
                                        required
                                        readOnly={true}
                                        defaultValue={patient ? patient.birthdate : ''}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={true}
                                        value={patient ? patient.age : ''}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Select
                                        className="form-control "
                                        disabled={true}
                                        defaultValue={patient ? patient.sex : ''}
                                    >
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Civil Status</Form.Label>
                                    <Form.Select
                                        className="form-control "
                                        disabled={true}
                                        defaultValue={patient ? patient.civilStatus : ''}
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
                                readOnly={true}
                                defaultValue={patient ? patient.email : ''}
                            />
                            <Form.Label>Facebook Name</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        required
                                        readOnly={true}
                                        defaultValue={patient ? patient.facebookName : ''}
                                    />
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control
                                        className="form-control "
                                        type="text"
                                        readOnly={true}
                                        minLength={11}
                                        maxLength={11}
                                        defaultValue={patient ? patient.contact : ''}
                                    />
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                className="form-control"
                                as="textarea"
                                required
                                readOnly={true}
                                rows={2}
                                defaultValue={patient ? patient.address : ''}
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
                                            readOnly={true}
                                            defaultValue={patient ? patient.hospitalNumber : ''}
                                        />
                                    </Col>
                                <Col md={8}>
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="New Patient"
                                        disabled={true}
                                        checked={patient ? !patient.hospitalNumber : false}
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