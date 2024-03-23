// Filename - pages/ContactUs.js

import React from "react";
import Sidebar from "./Sidebar";
import PatientTable from "../PatientTable";

const PatientList = () => {
	return (
		<><Sidebar />
		<div className="contact">
			<h1>List of patients registered dito</h1>
			<PatientTable/>
		</div></>
	);
};

export default PatientList;
