 import React from 'react';
import { useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiSave } from 'react-icons/fi';
import Switch from '@mui/material/Switch';
import './AppointmentCapacitySettings.css';
import { alpha, styled } from '@mui/material/styles';
import './Calendar.css';

const AppointmentCapacitySettings = () => {

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#108942',
            '&:hover': {
                backgroundColor: alpha('#108942', theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#3AB149',
        },

    
    }));

    const [checkedAppointmentDeletion, setCheckedAppointmentDeletion] = useState(true);

    const handleAppointmentDeletionChange = (event) => {
        setCheckedAppointmentDeletion(event.target.checked);
    };
    
    const [checkedPatientDeletion, setCheckedPatientDeletion] = React.useState(true);

    const handlePatientDeletionChange = (event) => {
        setCheckedPatientDeletion(event.target.checked);
    };

    const [checkedAppointmentReschedule, setCheckedAppointmentReschedule] = React.useState(true);

    const handleAppointmentRescheduleChange = (event) => {
        setCheckedAppointmentReschedule(event.target.checked);
    }; 

    const handleSaveCapacitySettings = async () => {
        try {
            // program will first get the monthYear and capacity from the form
            const month = parseInt(document.getElementById('formMonthYear').value.substring(5, 7));
            const year = parseInt(document.getElementById('formMonthYear').value.substring(0, 4));
            const capacity = parseInt(document.getElementById('formCapacity').value);

            console.log(month, year, capacity);
            // then, a matching monthYear will be searched in the database
            const response = await axios.get('http://localhost:8000/api/settings/');
            const settingIdx = response.data.findIndex(setting => setting.month === month && setting.year === year);

            // if found, the capacity will be updated
            if (settingIdx !== -1) {
                await axios.put(`http://localhost:8000/api/settings/${response.data[settingIdx].id}/`, {
                    month: month,
                    year: year,
                    capacity: capacity
                });
            }

            // else, a new entry will be created
            else {
                await axios.post('http://localhost:8000/api/settings/', {
                    month: month,
                    year: year,
                    capacity: capacity
                });
            }

            // finally, a success message will be displayed
            alert(`Successfully set appointment capacity of ${capacity} for ${month}/${year}`);

        } catch (error) {
            alert('Error setting appointment capacity');
            console.log(error);
        }


    }

    return (
        <div class = 'admin-settings-box'>
            <Col> 
            <Form.Group controlId="formMonthYear">
                        <div className="flex-column">
                        <Form.Label class = 'form-label'>Select Month and Year</Form.Label>
                        <Form.Control class = 'form' type="month" />
                        <Form.Label class = 'form-label'>Select Hourly Capacity</Form.Label>
                        <Form.Control class = 'form' type="number" />
                        <Button variant="primary" type="submit" className="fc-button-primary" onClick={handleSaveCapacitySettings}>
                            <FiSave></FiSave>
                        </Button>
                    </div>
            </Form.Group>
            </Col>
            
            <Col>
            
                   <Form.Group>
                        <Form.Label class = 'form-label'>Allow Appointment Deletion</Form.Label>
                        <Row> 
                        <GreenSwitch
                            checked={checkedAppointmentDeletion}
                            onChange={handleAppointmentDeletionChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        
                        </Row>
                        <Form.Label class = 'form-label'>Allow Appointment Reschedule</Form.Label>
                        <Row> 
                        <GreenSwitch
                            checked={checkedAppointmentReschedule}
                            onChange={handleAppointmentRescheduleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </Row>

                    <Form.Label class = 'form-label'>Allow Patient Deletion</Form.Label>
                    <Row> 
                        <GreenSwitch
                            checked={checkedPatientDeletion}
                            onChange={handlePatientDeletionChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </Row>
                        </Form.Group>
                </Col>
        </div>
    )
}

export default AppointmentCapacitySettings;