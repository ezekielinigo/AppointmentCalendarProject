import React from "react";
import PatientTableList from "../PatientTableList";
import NavBar from "./AdminNavBar"	
import AdminNavs from "./AdminNavs";

const PatientList = () => {
	return (
		<>
		<NavBar />
		<AdminNavs/>
		<div className="contact">
			<h1>List of patients registered dito</h1>
			<PatientTableList/>
		</div></>
	);
};

export default PatientList;
