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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },

      }}
    >
      <ButtonGroup variant="outlined">
        <Link to = {PathConstants.ADMINCALENDARVIEW}> 
        <Button size = 'large' color = 'primary'>CALENDAR VIEW</Button>
        </Link>

        <Link to = {PathConstants.ADMINSETTINGS}> 
        <Button size = 'large'>ADMIN SETTINGS</Button>
        </Link>

        <Link to = {PathConstants.ADMINAPPOINTMENTS}>
        <Button size = 'large'>APPOINTMENT TABLE</Button>
        </Link>

        <Link to = {PathConstants.ADMINPATIENTLIST}>
        <Button size = 'large'>PATIENT TABLE</Button>
        </Link>
      </ButtonGroup>
     
    </Box>
  );
}
