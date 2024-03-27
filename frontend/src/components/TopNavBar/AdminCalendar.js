import React from "react";
import Calendar from "../Calendar"
import NavBar from "./AdminNavBar"
import AdminNavs from "./AdminNavs";
import { useState } from "react";

export const CalendarView = () => {
	return (
		<>
		
		<NavBar/>
		<div>
			<AdminNavs/>
			<Calendar />
		</div></>
	);
};

