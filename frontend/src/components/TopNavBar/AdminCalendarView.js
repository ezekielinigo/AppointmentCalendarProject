import React from "react";
import AdminCalendar from "./AdminCalendar"
import NavBar from "./AdminNavBar"
import AdminNavs from "./AdminNavs";
import { useState } from "react";
import { useContext } from "react";
import { ClinicContext } from "../../App";

export const CalendarView = () => {

	return (
		<>
		<NavBar/>
		<div>
			<AdminNavs/>
			<AdminCalendar />
		</div></>
	);
};

