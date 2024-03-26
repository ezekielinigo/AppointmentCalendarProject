/* RMC COLOR PALETTE
text green: #056839
dark green: #108942
green: #3ab149
light green: #72b844
yellow green: #b5d333
white: whitesmoke
black: #071108
 */

import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import "./PatientNavBar.css";
import logo from "../assets/rmc-logo.png";
import { Button } from "react-bootstrap";

const Nav = styled.div`
	background: #071108;
	height: 80px;
	display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PatientNavBar = () => {

    

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

					<h2 class = 'welcome'> Welcome,  </h2>

                    <Button variant="outline-light" style = {{
                        margin: 10,
                        alignItems: 'right'
                    }}> Log Out </Button>

				</Nav>

                
			</IconContext.Provider>
		</>
	);
};

export default PatientNavBar;
