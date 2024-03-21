// Filename - pages/Services.js

import React from "react";
import Sidebar from "./Sidebar";
import AppointmentCapacitySettings from "../AppointmentCapacitySettings";

export const Services = () => {
	return (
		<><Sidebar />
		<div className="services">
			<AppointmentCapacitySettings></AppointmentCapacitySettings>
		</div></>
	);
};
