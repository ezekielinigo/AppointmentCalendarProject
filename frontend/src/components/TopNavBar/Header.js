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
import "./Header.css";

const Nav = styled.div`
	background: #071108;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: right;
`;


const Header = () => {

	return (
		<>
			<IconContext.Provider value={{ color: "whitesmoke" }}>
				<Nav>
					<h1 class = "header-title">
						RMC Clinic Appointment Calendar
					</h1>	
				</Nav>
			</IconContext.Provider>
		</>
	);
};

export default Header;
