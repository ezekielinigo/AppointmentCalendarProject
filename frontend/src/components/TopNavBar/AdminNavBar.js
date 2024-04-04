/* RMC COLOR PALETTE
text green: #056839
dark green: #108942
green: #3ab149
light green: #72b844
yellow green: #b5d333
white: whitesmoke
black: #071108
 */

import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import "../NavBar.css";
import logo from "./rmc-logo.png";
import { Button } from "react-bootstrap";
import { ClinicContext, isClinicLoggedInContext } from '../../App';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../../PathConstants';
import axios from 'axios';
import { getCookie } from '../utils/cookie';


const Nav = styled.div`
	background: #071108;
	height: 80px;
	display: flex;
    justify-content: space-between;
    align-items: center;
`;	

/*
For testing sa backend:
{
    "username": "577204",
    "password": "123"
}

*/

function AdminNavBar() {
	const { clinicid, setClinicID, clinicpassword, setClinicPassword } = useContext(ClinicContext);
	const { isClinicLoggedIn, setIsClinicLoggedIn } = useContext(isClinicLoggedInContext);
	const navigate = useNavigate();

	/*
	useEffect(() => {
		const storedClinicId = sessionStorage.getItem('clinicid');
		const storedClinicPassword = sessionStorage.getItem('clinicpassword');

		if (storedClinicId) {
			setClinicID(storedClinicId);
		}
		if (storedClinicPassword) {
			setClinicPassword(storedClinicPassword);
		}

		if (!isClinicLoggedIn) {
			navigate(PathConstants.LOGIN);
		}
	}, [isClinicLoggedIn, navigate]); */

	useEffect(() => {
		const storedClinicId = sessionStorage.getItem('clinicid');
		const storedClinicPassword = sessionStorage.getItem('clinicpassword');

		if (storedClinicId) {
			setClinicID(storedClinicId);
		}

		if (storedClinicPassword) {
			setClinicPassword(storedClinicPassword);
		}

	}, []);

	useEffect(() => {
		sessionStorage.setItem('clinicid', clinicid);
		sessionStorage.setItem('clinicpassword', clinicpassword);
	}, [clinicid, clinicpassword]);

	const handleLogout = async () => {
		try {
			const csrftoken = getCookie('csrftoken');
			
			// alert(clinicid, clinicpassword);

			const response = await axios.post('http://localhost:8000/logout', {
				username: clinicid,
				password: clinicpassword 
			}, {
				headers: {
					'X-CSRFToken': csrftoken
				}
			});
			
			if (response.status === 200) {
				sessionStorage.removeItem('isClinicLoggedIn');
				sessionStorage.removeItem('clinicid');
				sessionStorage.removeItem('clinicpassword');
				setIsClinicLoggedIn(false);
				alert("You have been logged out successfully. Redirecting to login page.");
				navigate(PathConstants.LOGINCLINIC);
			} 
			
			else {
				console.error('Failed to log out on the server');
			}

		} 
		
		catch (error) {
			console.error('Failed to log out', error);
		}
	} 
	
	return (
		<>
			<IconContext.Provider value={{ color: "whitesmoke" }}>
				<Nav>
					<img style = {{ 
						margin: 10, width: 70, height: 70 
					}}
					
					src={logo}/>
					<h1 class = "header-title">
						RMC Clinic Appointment Calendar
					</h1>
					
					{isClinicLoggedIn &&
					
					<><h2 class='welcome'> Welcome, {clinicid} </h2><Button variant="outline-light" onClick={handleLogout} style={{
							margin: 10,
							alignItems: 'right'
						}}> Log Out </Button></>
					}
					
				</Nav>
			</IconContext.Provider>
		</>
	);
};

export default AdminNavBar;
