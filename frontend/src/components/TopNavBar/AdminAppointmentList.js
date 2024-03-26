import React from "react";
import PatientTable from "../PatientTable";
import AdminNavs from "./AdminNavs";
import NavBar from "./AdminNavBar"

const AdminAppointmentList = () => {
	return (
		<><NavBar />
        <AdminNavs/>
		<div className="contact">
            
			<h1>List of appointments dito</h1>
			<PatientTable/>
		</div></>
	);
};

export default AdminAppointmentList;
