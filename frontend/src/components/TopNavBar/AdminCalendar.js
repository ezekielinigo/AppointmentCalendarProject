import React from "react";
import Calendar from "../Calendar"
import NavBar from "./AdminNavBar"
import AdminNavs from "./AdminNavs";

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

