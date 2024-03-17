import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Calendar.css';
import { FiLock, FiUnlock, FiSave } from 'react-icons/fi';
// icon library here -> https://circumicons.com/icons

const AppointmentInfoModal = ({show, handleClose, appointment, editLock, handleEditLock, handleSave, tempData, setTempData}) => {

    // creating the date label for the forms
    const date = appointment ? appointment.extendedProps.appointmentNumber : '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthString = months[parseInt(date.substring(2,4), 10) - 1];
    const dateLabel = monthString + " " +  date.substring(4,6) + ", " + date.substring(9,13);

    // temporary appointment state
    //let tempNameFirst = appointment ? appointment.extendedProps.nameFirst : '';


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
                                className="form-control form-control-sm"
                                type="text"
                                readOnly={!editLock}
                                defaultValue={appointment ? appointment.extendedProps.nameFirst : ''}
                                onChange={e => setTempData({...tempData, nameFirst: e.target.value})}
                            />
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                                className="form-control form-control-sm"
                                type="text"
                                readOnly={!editLock}
                                //value={tempData.nameMiddle || ''}
                                //onChange={e => setTempData({...tempData, nameMiddle: e.target.value})}
                            />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className="form-control form-control-sm"
                                type="text"
                                readOnly={!editLock}
                                //value={tempData.nameLast || ''}
                                //onChange={e => setTempData({...tempData, nameLast: e.target.value})}
                            />
                            <Row>
                                <Col md={9}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="date"
                                        readOnly={!editLock}
                                        //value={tempData.birthdate || ''}
                                        //onChange={e => setTempData({...tempData, birthdate: e.target.value})}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="text"
                                        readOnly={true}
                                        //value={tempData.age || ''}
                                        //onChange={e => setTempData({...tempData, age: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Select
                                        className="form-control form-control-sm"
                                        disabled={!editLock}
                                        //value={tempData.sex || ''}
                                        //onChange={e => setTempData({...tempData, sex: e.target.value})}
                                    >
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Civil Status</Form.Label>
                                    <Form.Select
                                        className="form-control form-control-sm"
                                        disabled={!editLock}
                                        //value={tempData.civilStatus || ''}
                                        //onChange={e => setTempData({...tempData, civilStatus: e.target.value})}
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
                                className="form-control form-control-sm"
                                type="text" readOnly={!editLock}
                                //value={tempData.email || ''}
                                //onChange={e => setTempData({...tempData, email: e.target.value})}
                            />
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Facebook Name</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="text"
                                        readOnly={!editLock}
                                        //value={tempData.facebookName || ''}
                                        //onChange={e => setTempData({...tempData, facebookName: e.target.value})}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="text"
                                        readOnly={!editLock}
                                        //value={tempData.contact || ''}
                                        //onChange={e => setTempData({...tempData, contact: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                className="form-control form-control-sm"
                                as="textarea"
                                readOnly={!editLock}
                                rows={2}
                                //value={tempData.address || ''}
                                //onChange={e => setTempData({...tempData, address: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTextField">
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Appointment No.</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="text"
                                        readOnly={true}
                                        //value={tempData.appointmentNumber || ''}
                                        //onChange={e=> setTempData({...tempData, appointmentNumber: e.target.value})}
                                    />
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="New Patient"
                                        disabled={!editLock}
                                        //checked={tempData.followup || false}
                                        //onChange={e => setTempData({...tempData, followup: e.target.value})}
                                    />
                                    <Form.Check
                                        className="form-check form-check-inline"
                                        type="checkbox"
                                        label="Follow-up"
                                        disabled={!editLock}
                                        //checked={tempData.followup || false}
                                        //onChange={e => setTempData({...tempData, followup: e.target.value})}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Hospital No.</Form.Label>
                                    <Form.Control
                                        className="form-control form-control-sm"
                                        type="text"
                                        readOnly={!editLock}
                                        //value={tempData.hospitalNumber || ""}
                                        //onChange={e => setTempData({...tempData, hospitalNumber: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Form.Label>Referral Doctor</Form.Label>
                            <Form.Control
                                className="form-control form-control-sm"
                                type="text"
                                readOnly={!editLock}
                                //value={tempData.referralDoctor || ""}
                                //onChange={e => setTempData({...tempData, referralDoctor: e.target.value})}
                            ></Form.Control>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                className="form-control form-control-sm"
                                as="textarea"
                                readOnly={!editLock}
                                rows={14}
                                //value={tempData.remarks || ""}
                                //onChange={e => setTempData({...tempData, remarks: e.target.value})}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AppointmentInfoModal;