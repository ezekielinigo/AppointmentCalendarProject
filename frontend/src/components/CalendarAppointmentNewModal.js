import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Calendar.css';
import {FiSave, FiTrash} from "react-icons/fi";

const AppointmentNewModal = ({show, handleClose, handleTrash, handleSave}) => {
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

export default AppointmentNewModal;