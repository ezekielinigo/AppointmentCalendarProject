import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import './AdminNavs.css'
import PathConstants from '../../PathConstants';
import {Link} from 'react-router-dom';
/*import { FaCalendar } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6"; */

export default function VariantButtonGroup() {
  return (
    /*<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },

      }}
    > */




      <ButtonGroup class = 'button-group' variant="outlined">
        <Link to = {PathConstants.ADMINCALENDARVIEW}> 
        <Button class = 'nav-buttons' size = 'large'>CALENDAR VIEW</Button>
        </Link>

        <Link to = {PathConstants.ADMINSETTINGS}> 
        <Button class = 'nav-buttons' size = 'large'>ADMIN SETTINGS</Button>
        </Link>

        <Link to = {PathConstants.ADMINAPPOINTMENTS}>
        <Button class = 'nav-buttons' size = 'large'>APPOINTMENT TABLE</Button>
        </Link>

        <Link to = {PathConstants.ADMINPATIENTLIST}>
        <Button class = 'nav-buttons' size = 'large'>PATIENT TABLE</Button>
        </Link>
      </ButtonGroup>
     
    /* </Box> */
  );
}
