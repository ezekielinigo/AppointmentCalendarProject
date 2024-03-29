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
import { SettingsContext } from '../App';
import { useContext } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';


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

    const {
        checkedAppointmentDeletion,
        setCheckedAppointmentDeletion,
        handleAppointmentDeletionChange,
        checkedPatientDeletion,
        setCheckedPatientDeletion,
        handlePatientDeletionChange,
        checkedAppointmentReschedule,
        setCheckedAppointmentReschedule,
        handleAppointmentRescheduleChange,
        month, year, capacity,
        setMonth, setYear, setCapacity,
        handleMonthChange, handleYearChange, handleCapacityChange,
    } = useContext(SettingsContext);



    /*const month = parseInt(document.getElementById('formMonthYear').value.substring(5, 7));
    const year = parseInt(document.getElementById('formMonthYear').value.substring(0, 4));
    const capacity = parseInt(document.getElementById('formCapacity').value);*/

    /*
    const handleSaveCapacitySettings = async () => {
        try {
            // program will first get the monthYear and capacity from the form
            /*const month = parseInt(document.getElementById('formMonthYear').value.substring(5, 7));
            const year = parseInt(document.getElementById('formMonthYear').value.substring(0, 4));
            const capacity = parseInt(document.getElementById('formCapacity').value); */

            /*console.log(month, year, capacity);
            alert(`Month: ${month}, Year: ${year}, Capacity: ${capacity}`);
            // then, a matching monthYear will be searched in the database
            const response = await axios.get('http://localhost:8000/api/settings/');
            const settingIdx = response.data.findIndex(setting => Number(setting.month) === month && Number(setting.year) === year);
            
            alert(`Setting Index: ${settingIdx}`);
            // if found, the capacity will be updated
            if (settingIdx !== -1) {
                await axios.put(`http://localhost:8000/api/settings/${response.data[settingIdx].id}/`, {
                    month: month,
                    year: year,
                    capacity: capacity
                });

                console.log(response.data[settingIdx].id);
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
            alert('Please fill the fields correctly.');
            //alert(error);
            console.log(error);
        }

    } */

    const handleSaveCapacitySettings = async () => {
        try {
            console.log(month, year, capacity);
            // a matching monthYear will be searched in the database
            const response = await axios.get('http://localhost:8000/api/settings/');
            
            let isUpdated = false;

            // trying forloop implementation compared sa initial na findIndex
            for (let i = 0; i < response.data.length; i++) {
                // added parseInt para hopefully tama yung maging comparison
                if (parseInt(response.data[i].month) === parseInt(month) && parseInt(response.data[i].year) === parseInt(year)) {
                    // if found, the capacity will be updated
                    await axios.put(`http://localhost:8000/api/settings/${Number(response.data[i].id)}/`, {
                        month: month,
                        year: year,
                        capacity: capacity
                    });
                    isUpdated = true; // an existing entry has been updated
                    break;
                }
            }

            if (!isUpdated) { // if not updated, then post a new entry
                // else, a new entry will be created
                await axios.post('http://localhost:8000/api/settings/', {
                    month: month,
                    year: year,
                    capacity: capacity
                });
            }
            // finally, a success message will be displayed
            alert(`Successfully set appointment capacity of ${capacity} for ${month}/${year}`);
        } 
        
        catch (error) {
            alert('Please fill the fields correctly.');
            console.log(error);
        }
    }

    return (
        <div class = 'admin-settings-box'>
            <Col> 
            <Form.Group controlId="formMonthYear">
                        <div className="flex-column">
                        <FormLabel className='settings-form-label'>Select Month</FormLabel>
            <FormControl
                className='settings-form-control'
                as="select"
                value={month}
                onChange={handleMonthChange}
            >
                <option value ="0">Select Month</option>
                <option value="1">JANUARY</option>
                <option value="2">FEBRUARY</option>
                <option value="3">MARCH</option>
                <option value="4">APRIL</option>
                <option value="5">MAY</option>
                <option value="6">JUNE</option>
                <option value="7">JULY</option>
                <option value="8">AUGUST</option>
                <option value="9">SEPTEMBER</option>
                <option value="10">OCTOBER</option>
                <option value="11">NOVEMBER</option>
                <option value="12">DECEMBER</option>
            </FormControl>
            <FormLabel className='settings-form-label'>Select Year</FormLabel>
            <FormControl
                className='settings-form-control'
                type="number"
                value={year}
                onChange={handleYearChange}
            />
            <FormLabel className='settings-form-label'>Select Hourly Capacity</FormLabel>
            <FormControl
                className='settings-form-control'
                type="number"
                value={capacity}
                onChange={handleCapacityChange}
            />
                        <Button variant="primary" type="submit" className="fc-button-primary" onClick={handleSaveCapacitySettings}>
                            <FiSave></FiSave>
                        </Button>
                    </div>
            </Form.Group>
            </Col>
            
            <Col>
            
                   <Form.Group>
                        <Form.Label class='settings-form-label'>Allow Appointment Deletion</Form.Label>
                        <Row> 
                        <GreenSwitch
                            checked={checkedAppointmentDeletion}
                            onChange={handleAppointmentDeletionChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        
                        </Row>
                        <Form.Label class='settings-form-label'>Allow Appointment Reschedule</Form.Label>
                        <Row> 
                        <GreenSwitch
                            checked={checkedAppointmentReschedule}
                            onChange={handleAppointmentRescheduleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </Row>

                    <Form.Label class='settings-form-label'>Allow Patient Deletion</Form.Label>
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