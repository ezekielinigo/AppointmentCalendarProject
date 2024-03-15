import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './Calendar.css';
import AppointmentInfoModal from './CalendarModals';

const Calendar = () => {
    // State to store the events
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const calendarRef = useRef(null);
    const [editLock, setEditLock] = useState(true);
    const handleEditLock = () => {
        setEditLock(!editLock);
    }
    const handleClose = () => {
        setShowModal(false);
        setEditLock(false);
    }
    const handleDateClick = (info) => {
        setSelectedAppointment(info.event);
        setShowModal(true);
    }

    // This fetches events from the database and puts it in the state
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments/');
            const appointments = response.data.map(appointment => {
                const dateTime = new Date(`${appointment.date}T${appointment.time}`);
                return {
                    title: appointment.appointmentNumber.substring(10,) + ' : ' + appointment.patient.nameLast + ', ' + appointment.patient.nameFirst[0] + '.',
                    date: dateTime,
                    allDay: false,
                    extendedProps: {
                        nameFirst: appointment.patient.nameFirst,
                        nameMiddle: appointment.patient.nameMiddle,
                        nameLast: appointment.patient.nameLast,
                        remarks: appointment.remarks,
                        birthdate: appointment.patient.birthdate,
                        hospitalNumber: appointment.patient.hospitalNumber,
                        email: appointment.patient.email,
                        contact: appointment.patient.contact,
                        appointmentNumber: appointment.appointmentNumber,
                        facebookName: appointment.patient.facebookName,
                        followup: appointment.followup,
                        address: appointment.patient.address,
                        age: appointment.patient.age,
                        sex: appointment.patient.sex,
                        civilStatus: appointment.patient.civilStatus,
                        dateLabel: appointment.date,
                        timeLabel: appointment.time
                    }
                };
            });
            setEvents(appointments);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch event happens when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // FullCalendar component that displays the calendar
    return (
        <div className="calendar">
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listDay',
                }}
                slotLabelFormat={{ // week view y-axis
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                }}
                titleFormat={{ // top of calendar
                    month:'long',
                    year:'numeric'
                }}
                viewDidMount={function(info) {
                    if (calendarRef.current) {
                        const calendarApi = calendarRef.current.getApi();
                        if (info.view.type === 'dayGridMonth') {
                            calendarApi.setOption('dayHeaderFormat', {
                                weekday: 'short'
                            });
                            calendarApi.setOption('dayPopoverFormat', {
                                month: 'short',
                                day: 'numeric'
                            });
                        }else {
                            calendarApi.setOption('dayHeaderFormat', {
                                weekday: 'short',
                                day: 'numeric',
                            });
                            calendarApi.setOption('dayPopoverFormat', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                            });
                        }
                    }
                }}
                moreLinkContent={({num}) => `${num}/6`}
                slotDuration='01:00:00'
                slotEventOverlap={false}
                eventMaxStack={0}
                dayMaxEvents={0}
                nowIndicator={true}
                allDaySlot={false}
                eventClick={handleDateClick}
                selectable={true}
            />
            <AppointmentInfoModal
                show={showModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                editLock={editLock}
                handleEditLock={handleEditLock}
            />
        </div>
    );

};


export default Calendar;
