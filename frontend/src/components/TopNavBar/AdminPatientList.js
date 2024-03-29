import React from "react";
import PatientTableList from "../PatientTableList";
import NavBar from "./AdminNavBar"	
import AdminNavs from "./AdminNavs";

const PatientList = () => {
	return (
		<>
		<NavBar />
		<AdminNavs/>
		<div className="patient-table">
			<PatientTableList/>
		</div></>
	);
};

export default PatientList;
