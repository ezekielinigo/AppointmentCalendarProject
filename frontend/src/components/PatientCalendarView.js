import React from "react";
import NavBar from "./PatientNavBar"
import PatientNavs from "./PatientNavs";
import PatientCalendar from "./PatientCalendar";

const PatientCalendarView = () => {
    return (
        <>
        <NavBar/>
        <div>
            <PatientNavs/>
            <PatientCalendar />
        </div></>
    );
}

export default PatientCalendarView;