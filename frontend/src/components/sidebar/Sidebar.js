// Filename - components/Sidebar.js
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
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
	background: #071108;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: right;
`;

const NavIcon = styled(Link)`
	margin-left: 2rem;
	font-size: 2rem;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: right;
`;

const Sidebar = () => {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<IconContext.Provider value={{ color: "whitesmoke" }}>
				<Nav>
					<h1
						style={{
							textAlign: "center",
							marginLeft: "200px",
							color: "#3ab149",
						}}
					>
						RMC Clinic Appointment Calendar
					</h1>
					
						{SidebarData.map((item, index) => {
							return (
								<SubMenu
									item={item}
									key={index}
								/>
							);
						})}
					
				</Nav>
			</IconContext.Provider>
		</>
	);
};

export default Sidebar;
