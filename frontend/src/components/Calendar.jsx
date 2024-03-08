import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from "axios";
import FormInput from '../FormInput';

function Calendar() {

    const centered = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
    }
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => { // this will fetch all events from backend and display them on the calendar
    axios.get('http://localhost:8000/api/appointments/')
        .then(res => {
            setEvents(res.data.map(appointment => ({
                title: appointment.title,
                start: new Date(appointment.date),
                allDay: true
            })));
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventTitle === '' || eventDate === '') {
            alert('Please fill in all fields');
        } else {
            const newEvent = {title: eventTitle, date: eventDate}; // this will create an "event" object
            alert('Event added successfully!')
            axios.post('http://localhost:8000/api/appointments/', newEvent) // this will add that event to backend
                .then(res => {
                    setEvents([...events, res.data ]); // this will display the event on the calendar
                    setEventTitle(''); // these two will clear input fields after submit
                    setEventDate('');
                })
                .catch(err => console.log(err));
        }
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/appointments/${id}`)
            .then(res => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(err => console.log(err));
    }

   return (
                <section className="flex flex-col justify-center items-center px-16 py-12 min-h-screen">
                    <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                        <FormInput type="text" placeholder="Event Name" name="eventTitle" className="w-[369px]" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                        <FormInput type="date" placeholder="Event Date" name="eventDate" className="w-[369px]" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                        <button type="submit" className="px-4 py-1 bg-black text-white rounded">SUBMIT</button>
                        <button type="button" className="px-4 py-1 bg-red-500 text-white rounded" onClick={() => setEvents([])}>CLEAR</button>
                    </form>
                    <div className="calendar">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            style={centered}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,dayGridWeek',
                            }}
                            events={events} />
                    </div>
                </section>
            );
                        }
        

export default Calendar;