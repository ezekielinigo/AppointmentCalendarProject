import React from "react";
import PatientTable from "../PatientTable";
import NavBar from "./AdminNavBar"	
import AdminNavs from "./AdminNavs";

const PatientList = () => {
	return (
		<>
		<NavBar />
		<AdminNavs/>
		<div className="contact">
			<h1>List of patients registered dito</h1>
			<PatientTable/>
		</div></>
	);
};

export default PatientList;
