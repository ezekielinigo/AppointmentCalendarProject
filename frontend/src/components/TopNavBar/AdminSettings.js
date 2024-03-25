// Filename - pages/Services.js

import React from "react";
import NavBar from "./Header";
import AppointmentCapacitySettings from "../AppointmentCapacitySettings";
import AdminNavs from "./AdminNavs";

export const AdminSettings = () => {
	return (
		<>
		<NavBar />
		<AdminNavs/>
		<div className="services">
			<AppointmentCapacitySettings></AppointmentCapacitySettings>
		</div></>
	);
};
