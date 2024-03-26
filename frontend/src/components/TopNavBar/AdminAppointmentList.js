import React from "react";
import AppointmentTable from "../AppointmentTable";
import AdminNavs from "./AdminNavs";
import NavBar from "./AdminNavBar"
import "./AdminAppointmentList.css";

const AdminAppointmentList = () => {
	return (
		<><NavBar />
        <AdminNavs/>
		<div className="appointment-table">
			<AppointmentTable/>
		</div></>
	);
};

export default AdminAppointmentList;
