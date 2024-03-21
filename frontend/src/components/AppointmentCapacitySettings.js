import react from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiSave } from 'react-icons/fi';
import './Calendar.css';

const AppointmentCapacitySettings = () => {

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
        <div>
            <h1>Appointment Capacity Settings</h1>
            <Row>
                <Col md={4}>
                    <Form.Group controlId="formMonthYear">
                        <Form.Label>Select Month and Year</Form.Label>
                        <Form.Control className="form-control form-control-sm" type="month" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formCapacity">
                        <Form.Label>Select Hourly Capacity</Form.Label>
                        <Form.Control className="form-control form-control-sm" type="number" />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <div className="flex-column">
                        <Form.Label>Save Settings</Form.Label>
                        <Button variant="primary" type="submit" className="fc-button-primary" onClick={handleSaveCapacitySettings}>
                            <FiSave></FiSave>
                        </Button>
                    </div>

                </Col>
            </Row>



        </div>
    )
}

export default AppointmentCapacitySettings;