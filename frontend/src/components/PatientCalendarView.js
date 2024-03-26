import React from "react";
import NavBar from "./PatientNavBar"
import PatientNavs from "./PatientNavs";
// import Calendar from "./PatientCalendarView" // UNCOMMENT IF DUPLICATED NA.
import Calendar from "./Calendar" // COMMENT THIS LINE IF DUPLICATED NA.

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