// Filename - pages/Services.js

import React from "react";
import NavBar from "./AdminNavBar";
import AppointmentCapacitySettings from "../AppointmentCapacitySettings";
import AdminNavs from "./AdminNavs";

export const AdminSettings = () => {
	return (
		<>
		<NavBar />
		<AdminNavs/>

		<AppointmentCapacitySettings/>

		</> 
	);
};
