import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import './PatientNavs.css'
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
/*import { FaCalendar } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6"; */

export default function PatientNavs() {
  return (
      <ButtonGroup class = 'button-group' variant="outlined">
        <Link to = {PathConstants.PATIENTCALENDAR}> 
        <Button class = 'nav-buttons' size = 'large'>CALENDAR VIEW</Button>
        </Link>

        <Link to = {PathConstants.PATIENTPERSONALINFO}> 
        <Button class = 'nav-buttons' size = 'large'>PERSONAL INFORMATION</Button>
        </Link>

        <Link to = {PathConstants.PATIENTAPPOINTMENTLIST}> 
        <Button class = 'nav-buttons' size = 'large'>APPOINTMENT TABLE</Button>
        </Link>

      </ButtonGroup>
  );
}
