import React from "react";
import AppointmentList from "./PatientAppointmentTable";
import PatientNavs from "./PatientNavs";
import NavBar from "./PatientNavBar"

const PatientAppointmentList = () => {
	return (
		<><NavBar />
        <PatientNavs/>
		<div className="appointment-table">
			<AppointmentList/>
		</div></>
	);
};

export default PatientAppointmentList;
