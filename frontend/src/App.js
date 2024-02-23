import './App.css';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from "axios";

// Reusable Input Component
const FormInput = ({type, name, placeholder, className, value, onChange}) => (
  <div className={className}>
    <label htmlFor={name} className="sr-only">{placeholder}</label>
    <input type={type} id={name} name={name} placeholder={placeholder} className="p-2.5 w-full" value={value} onChange={onChange} />
  </div>
);

function App() {
    const centered = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
    }
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState([]);

    // display appointment data from the database to the calendar
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/appointments");
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }





    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventName === '' || eventDate === '') {
            alert('Please fill in all fields');
        } else {
            setEvents([...events, { title: eventName, date: eventDate }]);
            setEventName('');
            setEventDate('');
        }
    }

    return (
        <section className="flex flex-col justify-center items-center px-16 py-12 min-h-screen">
            <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                <FormInput type="text" placeholder="Event Name" name="eventName" className="w-[369px]" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <FormInput type="date" placeholder="Event Date" name="eventDate" className="w-[369px]" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                <button type="submit" className="px-4 py-1 bg-black text-white rounded">SUBMIT</button>
            </form>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridWeek"
                aspectRatio={3}
                events={events}
            />
        </section>
    );
}

export default App;