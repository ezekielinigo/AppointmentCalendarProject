import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import AppointmentInfoModal from './CalendarAppointmentInfoModal';
import AppointmentNewModal from "./CalendarAppointmentNewModal";

const Calendar = () => {
    // State to store the events
    const [events, setEvents] = useState([]);
    const [showAppointmentInfoModal, setShowAppointmentInfoModal] = useState(false);
    const [showAppointmentNewModal, setShowAppointmentNewModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const calendarRef = useRef(null);
    const [editLock, setEditLock] = useState(false);
    const [monthlyCapacities, setMonthlyCapacities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditLock = () => {
        setEditLock(!editLock);
    }

    const handleClose = () => {
        setShowAppointmentNewModal(false);
        setShowAppointmentInfoModal(false);
        setEditLock(false);
    }

    // this function checks whether a date is available or not
    // a date is available for new appointments if capacity is set and is not full
    // a date is available for new appointments if it is more than 1 day from now
    const isDateAvailable = (date) => {
        // Get the current date and add one day to it
        const currentDate = new Date();

        // If the selected date is less than or equal to the current date plus one day, return false
        if (date <= currentDate) {
            return false;
        }

        if (monthlyCapacities) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
            if (capacity) {
                const filledSlots = events.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month && eventDate.getDate() === day;
                }).length;
                return filledSlots < capacity.capacity*10;
            }
        }
        return false;
    }

    const handleDateClick = (info) => {
        // if the date clicked has been more than 1 day from now, create new appointment
        console.log(info.dateStr)
        if (isDateAvailable(info.date)) {
            if (info.view && info.view.type === 'dayGridMonth' && info.view.calendar) {
                const calendarApi = info.view.calendar;
                calendarApi.changeView('timeGridWeek', info.dateStr); // change view to week view and go to the date clicked
            } else {
                // appointment number format: FMDDMMYY-TTTT-XX
                // TTTT is the time in 12-hour format)
                // XX is the number of the appointment in the day
                // ex: FM123124-07AM-01
                const MM = info.dateStr.substring(5,7);
                const DD = info.dateStr.substring(8,10);
                const YY = info.dateStr.substring(2,4);
                const hour24 = parseInt(info.dateStr.substring(11,13));
                const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
                const TTTT = hour24 >= 12 ? `${hour12.toString().padStart(2, '0')}PM` : `${hour12.toString().padStart(2, '0')}AM`;
                const XX = events.filter(event => event.date.toISOString().substring(0,10) === info.dateStr.substring(0,10)).length + 1;
                const appointmentNumber = `FM${MM}${DD}${YY}-${TTTT}-${XX.toString().padStart(2, '0')}`;

                setSelectedAppointment({
                    id: null,
                    appointmentNumber: appointmentNumber,
                    patient: {
                        id: null,
                        nameFirst: '',
                        nameMiddle: '',
                        nameLast: '',
                        birthdate: '',
                        age: '',
                        sex: '',
                        civilStatus: '',
                        hospitalNumber: '',
                        contact: '',
                        email: '',
                        facebookName: '',
                        address: '',
                    },
                    label: '',
                    date: info.dateStr.substring(0,10),
                    time: info.dateStr.substring(11,19),
                    remarks: '',
                    followup: false,
                    referralDoctor: '',
                    newPatient: false
                })
                setEditLock(false);
                setShowAppointmentNewModal(true);
            }
        } else {
            // show a message to the user that the date is not available for new appointments
            alert('This date is not available for new appointments.');
        }
    }



    const handleAppointmentClick = (info) => {
        // if the appointment clicked is "add new appointment", then redirect to use the handleDateClick function
        // first convert the event's date to a Date object
        if (info.event.addNewButton) {
            return;
        }


        // when an appointment is clicked, the appointment info is stored in selectedAppointment state
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

        // if the appointment id is 0, it means new appointment will be made
            // if patient has hospital number
                // then check if a patient matches the hospital number
                // if patient exists
                    // then set that patient's id for this appointment
                // if patient does not exist
                    // then error 'Patient with hospital number XXXXXX does not exist, please leave blank if new patient.'
            // if patient does not have hospital number or hospital number is blank
                // then check if a patient matches the name and birthdate
                    // if patient exists
                        // then set that patient's id for this appointment
                    // if patient does not exist
                        // then create a new patient
                        // then set the new patient's id for this appointment
            // then create a new appointment
        // if the appointment id is not 0, it means an existing appointment will be updated
            // if patient information is changed
                // then update the patient information
            // if appointment information is changed
                // then update the appointment information

            try {
                const response = await axios.get('http://localhost:8000/api/patients/');
                if (selectedAppointment.id === null) {
                    console.log('actual: ', selectedAppointment);
                    const appointment = {
                        ...selectedAppointment,
                    };
                    delete appointment.id;
                    console.log('will send: ', appointment);
                    await axios.post('http://localhost:8000/api/appointments/', appointment);

                } else {
                    const patient = response.data.find(patient => patient.id === selectedAppointment.patient.id);
                    if (JSON.stringify(patient) !== JSON.stringify(selectedAppointment.patient)) {
                        await axios.put(`http://localhost:8000/api/patients/${selectedAppointment.patient.id}/`, selectedAppointment.patient);
                    }
                    const appointmentResponse = await axios.get(`http://localhost:8000/api/appointments/${selectedAppointment.id}/`);
                    if (JSON.stringify(appointmentResponse.data) !== JSON.stringify(selectedAppointment)) {
                        await axios.put(`http://localhost:8000/api/appointments/${selectedAppointment.id}/`, selectedAppointment);
                    }
                }
                //handleClose();
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
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch event happens when the component mounts
    useEffect(() => {
        fetchEvents();
        fetchCapacity();
    }, []);

    // FullCalendar component that displays the calendar
    return (
        <div className="calendar">
            {isLoading ? <div>Loading...</div> : (
                <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                }}
                slotLabelFormat={{ // week view y-axis
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                }}
                titleFormat={{
                    month: 'long',
                    year: 'numeric',
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
                dateClick={
                    function(info) {
                        if (info.view && info.view.type === 'dayGridMonth' && info.view.calendar) {
                            const calendarApi = info.view.calendar;
                            calendarApi.changeView('timeGridWeek', info.dateStr); // change view to week view and go to the date clicked
                        } else {
                            handleDateClick(info);
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
                                if (filledSlots === capacity.capacity) {
                                    info.el.style.color = '#3ab149';
                                    info.el.style.backgroundColor = '#071108';
                                }
                            }
                        }
                    }
                }
                moreLinkClick={
                    function(info) {
                        // remove existing appointment buttons
                        setEvents(prevEvents => {
                            return prevEvents.filter(event => !event.addNewButton);
                        });

                        // current date - 8 hours kasi bobo ung date
                        const date = info.date.setUTCHours(info.date.getUTCHours() - 8);
                        const newAppointmentButton = {
                            title: '+ New Appointment',
                            start: date,
                            addNewButton: true,
                        };

                        // if the date is in timegridweek view and date is available
                            // Add the new appointment button to the events state
                        if (info.view.type === 'timeGridWeek' && isDateAvailable(new Date(date))) {
                            setEvents(prevEvents => [...prevEvents, newAppointmentButton]);
                        }

                    }
                }
                selectAllow={(selectInfo) => {
                    const hour = selectInfo.start.getHours();
                    return hour >= 6 && hour < 18;
                }}
                dayCellDidMount={(info) => {
                    // get the date of the day cell (format: 'yyyy-mm-dd')
                    const dateStr = info.el.dataset.date;
                    const date = new Date(dateStr);

                    // get the current date (format: 'yyyy-mm-dd')
                    const currentDate = new Date();
                    const currentDateString = currentDate.toISOString().split('T')[0];

                    // call isDateAvailable with the date of the day cell
                    const isAvailable = isDateAvailable(date);

                    // if the date is not available and it's not the current date, color the day cell red
                    if (!isAvailable && dateStr !== currentDateString) {
                        info.el.style.backgroundColor = '#EBEBEB';
                    }
                }}
                slotDuration='01:00:00'
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
            )}
            <AppointmentInfoModal
                show={showAppointmentInfoModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                setAppointment={setSelectedAppointment}
                editLock={editLock}
                handleEditLock={handleEditLock}
                handleSave={handleSave}
            />
            <AppointmentNewModal
                show={showAppointmentNewModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                setAppointment={setSelectedAppointment}
                editLock={editLock}
                handleEditLock={handleEditLock}
                handleSave={handleSave}
            />
        </div>
    );



};


export default Calendar;
