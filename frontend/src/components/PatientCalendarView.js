import React from "react";
import NavBar from "./PatientNavBar"
import PatientNavs from "./PatientNavs";
import Calendar from "./PatientCalendar";

const PatientCalendarView = () => {
    return (
        <>
        <NavBar/>
        <div>
            <PatientNavs/>
            <Calendar /> 
        </div></>
    );
}

export default PatientCalendarView;