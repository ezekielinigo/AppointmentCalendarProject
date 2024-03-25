import React from "react";
import Calendar from "../Calendar"
import NavBar from "./Header"
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

