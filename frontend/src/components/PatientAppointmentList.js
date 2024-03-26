import React from "react";
import PatientTable from "./AppointmentTable";
import PatientNavs from "./PatientNavs";
import NavBar from "./PatientNavBar"

const PatientAppointmentList = () => {
	return (
		<><NavBar />
        <PatientNavs/>
		<div className="contact">
            
			<h1>List of appointments dito</h1>
			<PatientTable/>
		</div></>
	);
};

export default PatientAppointmentList;
