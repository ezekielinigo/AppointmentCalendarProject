import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './CalendarModals.css';

const AppointmentInfoModal = ({show, handleClose, appointment}) => {

    const age = appointment ? new Date().getFullYear() - new Date(appointment.extendedProps.birthdate).getFullYear() : '';

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Appointment Info</Modal.Title>
            <button className="close" onClick={handleClose}>X</button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group controlId="formCharField">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.nameFirst : ''} />
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.nameMiddle : ''} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.nameLast : ''}/>
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" defaultValue={appointment ? appointment.extendedProps.birthdate : ''}/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="text" defaultValue={appointment ? age : ''}/>
                                </Col>
                            </Row>
                            <Form.Label>Hospital No.</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.hospitalNumber : ''}/>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.email : ''}/>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" defaultValue={appointment ? appointment.extendedProps.contact : ''}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTextField">
                            <Form.Label>Appointment No.</Form.Label>
                            <Form.Control as="text" defaultValue={appointment ? appointment.extendedProps.appointmentNumber : ''}/>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control as="textarea" rows={10} defaultValue={appointment ? appointment.extendedProps.remarks : ''}/>
                            <Form.Check
                                type="checkbox"
                                label="Follow-up"
                                defaultChecked={appointment ? appointment.extendedProps.followup : false}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AppointmentInfoModal;