import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Calendar.css';
import { FiLock, FiUnlock } from 'react-icons/fi';

const AppointmentInfoModal = ({show, handleClose, appointment, editLock, handleEditLock}) => {


    return (
        <Modal className="AppointmentInfoModal" show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Appointment Form for X time/day</Modal.Title>
            <Button
                className="fc-button-primary"
                onClick={handleEditLock}>
                {editLock ? <FiUnlock /> : <FiLock />}
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.nameFirst : ''}/>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.nameMiddle : ''} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.nameLast : ''}/>
                            <Row>
                                <Col md={9}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="date" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.birthdate : ''}/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="text" readOnly={true} defaultValue={appointment ? appointment.extendedProps.age : ''}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Select className="form-control form-control-sm" disabled={!editLock} defaultValue={appointment ? appointment.extendedProps.sex : ''}>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </Form.Select>                                </Col>
                                <Col md={6}>
                                    <Form.Label>Civil Status</Form.Label>
                                    <Form.Select className="form-control form-control-sm" disabled={!editLock} defaultValue={appointment ? appointment.extendedProps.civilStatus : ''}>
                                        <option value="SINGLE">SINGLE</option>
                                        <option value="MARRIED">MARRIED</option>
                                        <option value="WIDOWED">WIDOWED</option>
                                        <option value="SEPARATED">SEPARATED</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.email : ''}/>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Facebook Name</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.facebookName : ''}/>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.contact : ''}/>
                                </Col>
                            </Row>
                            <Form.Label>Address</Form.Label>
                            <Form.Control className="form-control form-control-sm" as="textarea" readOnly={!editLock} rows={2} defaultValue={appointment ? appointment.extendedProps.address : ''}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTextField">
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Appointment No.</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="text" readOnly={true} defaultValue={appointment ? appointment.extendedProps.appointmentNumber : ''}/>
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="New Patient"
                                        disabled={!editLock}
                                        defaultChecked={appointment ? appointment.extendedProps.newPatient : false}
                                    />
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="Follow-up"
                                        disabled={!editLock}
                                        defaultChecked={appointment ? appointment.extendedProps.followup : false}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Hospital No.</Form.Label>
                                    <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} defaultValue={appointment ? appointment.extendedProps.hospitalNumber : ''}/>
                                </Col>
                            </Row>
                            <Form.Label>Referral Doctor</Form.Label>
                            <Form.Control className="form-control form-control-sm" type="text" readOnly={!editLock} ></Form.Control>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control className="form-control form-control-sm" as="textarea" readOnly={!editLock} rows={14} defaultValue={appointment ? appointment.extendedProps.remarks : ''}/>

                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AppointmentInfoModal;