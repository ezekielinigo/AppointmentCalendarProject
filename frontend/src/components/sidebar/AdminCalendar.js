import React from "react";
import Sidebar from "./Sidebar";
import Calendar from "../Calendar"

export const CalendarView = () => {
	return (
		<><Sidebar /> 
		<div className="home">
			<Calendar/>
		</div></>
	);
};

