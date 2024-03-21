import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import AppointmentInfoModal from './CalendarAppointmentInfoModal';
import AppointmentPromptModal from './CalendarAppointmentPromptModal';

const Calendar = () => {
    // State to store the events
    const [events, setEvents] = useState([]);
    const [showAppointmentInfoModal, setShowAppointmentInfoModal] = useState(false);
    const [showAppointmentPromptModal, setShowAppointmentPromptModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const calendarRef = useRef(null);
    const [editLock, setEditLock] = useState(false);
    const [monthlyCapacities, setMonthlyCapacities] = useState(null);
    const handleEditLock = () => {
        setEditLock(!editLock);
    }
    const handleClose = () => {
        setShowAppointmentPromptModal(false);
        setShowAppointmentInfoModal(false);
        setEditLock(false);
    }
    const handleAppointmentClick = (info) => {
        // when a date is clicked, the appointment info is stored in selectedAppointment state
        // selectedAppointment is then passed to the modal where it can be modified
        // after saving (thru handleSave), the info of selectedAppointment will be used to update the database

        setSelectedAppointment({
            id: info.event.extendedProps.appointmentId,
            appointmentNumber: info.event.extendedProps.appointmentNumber,
            patient: {
                id: info.event.extendedProps.patientId,
                nameFirst: info.event.extendedProps.nameFirst,
                nameMiddle: info.event.extendedProps.nameMiddle,
                nameLast: info.event.extendedProps.nameLast,
                birthdate: info.event.extendedProps.birthdate,
                age: info.event.extendedProps.age,
                sex: info.event.extendedProps.sex,
                civilStatus: info.event.extendedProps.civilStatus,
                hospitalNumber: info.event.extendedProps.hospitalNumber,
                contact: info.event.extendedProps.contact,
                email: info.event.extendedProps.email,
                facebookName: info.event.extendedProps.facebookName,
                address: info.event.extendedProps.address,
            },
            label: info.event.title.substring(9,),
            date: info.event.startStr.substring(0,10),
            time: info.event.startStr.substring(11,19),
            remarks: info.event.extendedProps.remarks,
            followup: info.event.extendedProps.followup,
            referralDoctor: info.event.extendedProps.referralDoctor,
            newPatient: info.event.extendedProps.newPatient
        });
        setShowAppointmentInfoModal(true);
    }
    const handleSave = async () => {
        try {
            await axios
            .put(`http://localhost:8000/api/patients/${selectedAppointment.patient.id}/`, selectedAppointment.patient)
            .then(response => {console.log(response);});

            await axios
                .put(`http://localhost:8000/api/appointments/${selectedAppointment.id}/`, selectedAppointment)
                .then(response => {console.log(response);});

            handleClose();
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    // This fetches events from the database and puts it in the state
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments/');
            const appointments = response.data.map(appointment => {
                return {
                    title: appointment.appointmentNumber.substring(9,) + ' : ' + appointment.label,
                    date: new Date(`${appointment.date}T${appointment.time}`),
                    allDay: false,
                    extendedProps: {
                        appointmentId: appointment.id,
                        patientId: appointment.patient.id,
                        nameFirst: appointment.patient.nameFirst,
                        nameMiddle: appointment.patient.nameMiddle,
                        nameLast: appointment.patient.nameLast,
                        birthdate: appointment.patient.birthdate,
                        hospitalNumber: appointment.patient.hospitalNumber,
                        email: appointment.patient.email,
                        contact: appointment.patient.contact,
                        facebookName: appointment.patient.facebookName,
                        address: appointment.patient.address,
                        age: appointment.patient.age,
                        sex: appointment.patient.sex,
                        civilStatus: appointment.patient.civilStatus,
                        appointmentNumber: appointment.appointmentNumber,
                        remarks: appointment.remarks,
                        followup: appointment.followup,
                        referralDoctor: appointment.referralDoctor,
                        newPatient: appointment.newPatient
                    }
                };
            });
            setEvents(appointments);
        } catch (error) {
            console.error(error);
        }
    };

    // this fetches the capacity from the database
    const fetchCapacity = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/settings/');
            const databaseCapacities = response.data.map(setting => {
                return {
                    month: setting.month,
                    year: setting.year,
                    capacity: setting.capacity
                };
            });
            setMonthlyCapacities(databaseCapacities);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch event happens when the component mounts
    useEffect(() => {
        fetchEvents();
        fetchCapacity();
    }, []);

    const handleDateClick = (info) => {
        setShowAppointmentPromptModal(true);

    }

    // FullCalendar component that displays the calendar
    return (
        <div className="calendar">
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
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
                            calendarApi.setOption('dateClick', () => {});
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
                            calendarApi.setOption('dateClick', (info) => {
                                handleDateClick(info);
                            });
                        }
                    }
                }}
                moreLinkContent={''} // this handles the text that hides events in a given day/hour, we want this hidden
                moreLinkDidMount={ // because this is used instead, as it is able to get the capacity of the day/hour
                    function (info) {
                        const filledSlots = info.num;

                        const date = info.el.closest('.fc-day').dataset.date;
                        const year = parseInt(date.split('-')[0]);
                        const month = parseInt(date.split('-')[1]);

                        if (monthlyCapacities) {
                            const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
                            if (info.view.type === 'dayGridMonth') {
                                info.el.textContent = `${filledSlots}/${capacity.capacity*10} appointments`;
                            } else {
                                info.el.textContent = `${filledSlots}/${capacity.capacity} appointments`;
                            }
                        }
                    }
                }
                selectAllow={(selectInfo) => {
                    const hour = selectInfo.start.getHours();
                    return hour >= 6 && hour < 18;
                }}
                dayCellDidMount={(info) => {

                    // get the month and year of the current date (format: 'yyyy-mm-dd')
                    const date = info.el.dataset.date;
                    const year = parseInt(date.split('-')[0]);
                    const month = parseInt(date.split('-')[1]);

                    // get the filled slots of the day (format: 'filledSlots/totalSlots appointments')
                    let filledSlots = 0;
                    if (info.el.textContent) {
                        filledSlots = info.el.textContent.split('')[0].split('/')[0];
                    }

                    // find the capacity of the month and year
                    if (monthlyCapacities) {
                        const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
                        if (capacity) {
                            // if the filled slots is equal to the capacity, color the day red
                            if (filledSlots === capacity.capacity) {
                                info.el.style.backgroundColor = 'red';
                            }
                        }else{
                            // if the capacity is not set, color the day yellow
                            info.el.style.backgroundColor = '#F7EBEC';
                        }
                    }
                }}
                slotDuration='00:30:00'
                slotMinTime='07:00:00'
                slotMaxTime='17:00:00'
                slotEventOverlap={false}
                eventMaxStack={0}
                dayMaxEvents={0}
                nowIndicator={true}
                allDaySlot={false}
                eventClick={handleAppointmentClick}
                selectable={false}
                expandRows={true}
            />
            <AppointmentInfoModal
                show={showAppointmentInfoModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                setAppointment={setSelectedAppointment}
                editLock={editLock}
                handleEditLock={handleEditLock}
                handleSave={handleSave}
            />
            <AppointmentPromptModal
                show={showAppointmentPromptModal}
                handleClose={handleClose}
                handleSave={handleSave}
                handleTrash={handleClose}
            />
        </div>
    );



};


export default Calendar;
