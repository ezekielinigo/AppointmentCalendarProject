import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PatientContext } from '../App';
import { useContext } from 'react';

import {
  DataGrid,
} from '@mui/x-data-grid';

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const { firstName, middleName, lastName, birthDate, hospitalNumber } = useContext(PatientContext);
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/appointments`);
        const appointments = response.data;

        const matchingAppointments = appointments.filter(appointment => 
          appointment.patient.nameFirst === firstName &&
          appointment.patient.nameMiddle === middleName &&
          appointment.patient.nameLast === lastName &&
          appointment.patient.birthdate === birthDate &&
          appointment.patient.hospitalNumber === hospitalNumber
        );

        setRows(matchingAppointments);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [firstName, middleName, lastName, birthDate, hospitalNumber]); */
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/appointments`);
        const appointments = response.data;

        for (let appointment of appointments) {
          if (
            appointment.patient.nameFirst === firstName &&
            appointment.patient.nameMiddle === middleName &&
            appointment.patient.nameLast === lastName &&
            appointment.patient.birthdate === birthDate &&
            appointment.patient.hospitalNumber === hospitalNumber
          ) {
            const response = await axios.get(`http://localhost:8000/api/appointments/${appointment.id}`);
            setRows(prevRows => [...prevRows, response.data]);
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [firstName, middleName, lastName, birthDate, hospitalNumber]); */

  useEffect(() => {
    axios.get('http://localhost:8000/api/appointments/')
      .then(response => {
        const dataWithHospitalNumber = response.data.map(item => ({
          ...item,
          hospitalNumber: item.patient.hospitalNumber
        }));

        // console.log(firstName + middleName + lastName + birthDate + hospitalNumber);
        const patientAppointments = dataWithHospitalNumber.filter(item => 
          item.patient.nameFirst === firstName &&
          item.patient.nameMiddle === middleName &&
          item.patient.nameLast === lastName &&
          item.patient.birthdate === birthDate &&
          item.patient.hospitalNumber === hospitalNumber
        );

        setRows(patientAppointments);
        console.log(patientAppointments);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [firstName, middleName, lastName, birthDate]);

  const columns = [
    { field: 'date', headerName: 'Date', width: 130, editable: false },
    { field: 'time', headerName: 'Time', width: 130, editable: false },
    { field: 'appointmentNumber', headerName: 'Appointment Number', width: 180, editable: false },
    { field: 'remarks', headerName: 'Remarks', width: 300, editable: false },
    { field: 'referralDoctor', headerName: 'Referral Doctor', width: 200, editable: false },
  ]; 

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
      />
    </Box>
  );
}