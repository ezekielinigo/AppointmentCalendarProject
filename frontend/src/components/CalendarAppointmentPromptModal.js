import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Calendar.css';
import {FiSave, FiTrash} from "react-icons/fi";

const AppointmentPromptModal = ({show, handleClose, handleTrash, handleSave}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title style={{fontSize: '22px'}}>
                New Appointment
            </Modal.Title>
            <Button
                className="fc-button-primary"
                onClick={handleTrash}>
                <FiTrash />
            </Button>
            <Button
                className="fc-button-primary"
                onClick={handleSave}>
                <FiSave />
            </Button>
            </Modal.Header>
        </Modal>
    )
}

export default AppointmentPromptModal;