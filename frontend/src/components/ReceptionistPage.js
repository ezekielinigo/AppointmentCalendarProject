/* 

References:
https://www.geeksforgeeks.org/how-to-create-a-responsive-sidebar-with-dropdown-menu-in-reactjs/

*/


import './ReceptionistPage.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormInput from './FormInput'; // Import the FormInput component
import PathConstants from '../PathConstants';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import background from '../assets/rmc-bg.jpg';
import 'react-router-dom';


import Sidebar from "./sidebar/Sidebar";

function ReceptionistPage() {
    return (
        <> 
            <Sidebar />
        </>
    );
}



export default ReceptionistPage;