import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'
import { useContext } from "react";
import { SettingsContext, PatientContext } from '../App';
import AppointmentInfoModal from './PatientAppointmentInfoModal';
import AppointmentNewModal from './PatientAppointmentNewModal';

/* DIFFERENCES FROM AdminCalendar.js
* - patient can only view / move / edit their own appointments
* - other appointments are hidden
* - moreLinks with their appointments are highlighted lime green
* - appointment modals are autofilled with patient's info
* - appointment modals' patient info are locked
 */

const PatientCalendar = () => {
    // State to store the events
    const [events, setEvents] = useState([]);
    const [showAppointmentInfoModal, setShowAppointmentInfoModal] = useState(false);
    const [showAppointmentNewModal, setShowAppointmentNewModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(null);
    const calendarRef = useRef(null);
    const [monthlyCapacities, setMonthlyCapacities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [renderKey, setRenderKey] = useState(0);
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [currentDate, setCurrentDate] = useState(new Date());

    const { checkedAppointmentReschedule } = useContext(SettingsContext);

    const {
        firstName,
        middleName,
        lastName,
        birthDate,
        setFirstName,
        setMiddleName,
        setLastName,
        setbirthDate,
        hospitalNumber,
        sethospitalNumber,
    } = useContext(PatientContext)

    useEffect(() => {
        if (sessionStorage.getItem('firstName')) {
            setFirstName(sessionStorage.getItem('firstName'));
        }
        if (sessionStorage.getItem('middleName')) {
            setMiddleName(sessionStorage.getItem('middleName'));
        }
        if (sessionStorage.getItem('lastName')) {
            setLastName(sessionStorage.getItem('lastName'));
        }
        if (sessionStorage.getItem('birthDate')) {
            setbirthDate(sessionStorage.getItem('birthDate'));
        }
        if (sessionStorage.getItem('hospitalNumber')) {
            sethospitalNumber(sessionStorage.getItem('hospitalNumber'));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('middleName', middleName);
        sessionStorage.setItem('lastName', lastName);
        sessionStorage.setItem('birthDate', birthDate);
        sessionStorage.setItem('hospitalNumber', hospitalNumber);
        console.log(firstName, middleName, lastName, birthDate, hospitalNumber)
    }, [firstName, middleName, lastName, birthDate, hospitalNumber]);

    const handleClose = () => {
        setShowAppointmentNewModal(false);
        setShowAppointmentInfoModal(false);
    }

    const handleDelete = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this appointment?\nThis action cannot be undone.');
            if (confirm) {
                await axios.delete(`http://localhost:8000/api/appointments/${selectedAppointment.id}/`);
                handleClose();
                await fetchEvents();
                setRenderKey(prevKey => prevKey + 1);
            }else{
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // this function checks whether a date is available or not
    // a date is available for new appointments if capacity is set and is not full
    // a date is available for new appointments if it is more than 1 day from now
    const isDateAvailable = (date) => {
        // Get the current date and add one day to it
        const currentDate = new Date();

        // If the selected date is less than or equal to the current date plus one day, return false
        if (date < currentDate) {
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

    const isHourAvailable = (date) => {
        // Get the current date and add one day to it
        const currentDate = new Date();

        // If the selected date is less than or equal to the current date plus one day, return false
        if (date < currentDate) {
            return false;
        }

        if (monthlyCapacities) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
            if (capacity) {
                const filledSlots = events.filter(event => {
                    const eventDate = new Date(event.date);
                    return event.addNewButton !== true &&
                        eventDate.getFullYear() === year &&
                        eventDate.getMonth() + 1 === month &&
                        eventDate.getDate() === day &&
                        eventDate.getHours() === hour;
                }).length;
                return filledSlots < capacity.capacity;
            }
        }
        return false;
    }

    const handleDateClick = (info) => {
        // if the date clicked has been more than 1 day from now, create new appointment
        if (isDateAvailable(info.date)) {
            if (info.view && info.view.type === 'dayGridMonth' && info.view.calendar) {
                const calendarApi = info.view.calendar;
                calendarApi.changeView('timeGridWeek', info.dateStr); // change view to week view and go to the date clicked
            } 

            else if (checkExistingAppointment(events, currentPatient, info)) { // refactored yung pangcheck ng existing appointment,
                                                                              // para magamit dito sa handleDateClick
            alert('You already have an existing appointment. You can only have one appointment at a time.')

            }
            
            else {
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

                // get capacity for that date
                const month = info.date.getMonth() + 1;
                const year = info.date.getFullYear();
                const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
                let appointmentNumber = null;

                for (let i=1; i<=capacity.capacity; i++) {
                    const XX = i.toString().padStart(2, '0');
                    const tempAppointmentNumber = `FM${MM}${DD}${YY}-${TTTT}-${XX}`
                    const existingEvent = events.find(event => event.extendedProps && event.extendedProps.appointmentNumber === tempAppointmentNumber);
                    if (!existingEvent) {
                        appointmentNumber = tempAppointmentNumber;
                        break;
                    }
                }

                if (!isHourAvailable(info.date)) {
                    alert('Hourly capacity reached');
                }else {
                   setSelectedAppointment({
                                id: null,
                                appointmentNumber: appointmentNumber,
                                patient: currentPatient,
                                label: '',
                                date: info.dateStr.substring(0,10),
                                time: info.dateStr.substring(11,19),
                                remarks: '',
                                followup: false,
                                referralDoctor: '',
                                newPatient: false
                            })
                            // remove popover
                            setTimeout(() => {
                                const popover = document.querySelector('.fc-more-popover');
                                if (popover) {
                                    popover.remove();
                                }
                            }, 0);
                            setShowAppointmentNewModal(true);
                }
            }
        } 

        else {
            // show a message to the user that the date is not available for new appointments
            alert('This date is not available for new appointments.');
        }
    }

    const handleAppointmentClick = (info) => {
        // if the appointment clicked is "add new appointment", then redirect to use the handleDateClick function
        if (info.event.extendedProps.addNewButton) {
            // convert into format that handleDateClick can use
            const date = info.event.start;
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const time = date.getHours().toString().padStart(2, '0');
            const dateStr = `${year}-${month}-${day}T${time}:00:00+08:00`;
            const addAppointmentDate = {
                date: date,
                dateStr: dateStr
            }
            handleDateClick(addAppointmentDate);
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
        // remove popover
        setTimeout(() => {
            const popover = document.querySelector('.fc-more-popover');
            if (popover) {
                popover.remove();
            }
        }, 0);
        setShowAppointmentInfoModal(true);
    }

    const handleSave = async () => {
            try {

                const currentApp = selectedAppointment;
                console.log(currentApp)
                let currentDate = new Date();
                const patientList = (await axios.get('http://localhost:8000/api/patients/')).data;
                const appointmentList = (await axios.get('http://localhost:8000/api/appointments/')).data;

                // handle missing / incorrect appointment info according to model requirements

                // first and last names are required
                if (!currentApp.patient.nameFirst || !currentApp.patient.nameLast) {
                    alert('First and Last names are required.');
                    return;
                }
                // first and last names should not contain numbers
                if (/\d/.test(currentApp.patient.nameFirst) || /\d/.test(currentApp.patient.nameLast)) {
                    alert('First and last names should not contain numbers.');
                    return;
                }
                // birthdate is required
                if (!currentApp.patient.birthdate) {
                    alert('Birthdate is required.');
                    return;
                }
                // email should be valid
                if (currentApp.patient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentApp.patient.email)) {
                    alert('Invalid email.');
                    return;
                }
                // contact should be valid 11-digit number
                if (currentApp.patient.contact && !/^\d{11}$/.test(currentApp.patient.contact)) {
                    alert('Invalid contact number.');
                    return;
                }
                // mark as new patient if hospital number is not provided
                currentApp.newPatient = !currentApp.patient.hospitalNumber;

                // save appointment
                if (currentApp.id === null) { // for new appointment
                    if (currentApp.newPatient) {

                        // new patients do not have hospital number
                        // so full name and birthdate will be used to match
                        const newPatients = patientList.filter(patient => !patient.hospitalNumber);
                        const patientMatch = newPatients.find(patient => {
                            return patient.nameFirst.toUpperCase() === currentApp.patient.nameFirst &&
                                patient.nameMiddle.toUpperCase() === currentApp.patient.nameMiddle &&
                                patient.nameLast.toUpperCase() === currentApp.patient.nameLast &&
                                patient.birthdate === currentApp.patient.birthdate
                        });

                        if(patientMatch) {

                            // if patient already has an appointment after current time
                            // 'Patients can only have 1 existing appointment at a time.'
                            const newPatientAppointmentList = appointmentList.filter(appointment => !appointment.patient.hospitalNumber)
                            const existingAppointment = newPatientAppointmentList.find(appointment => {
                                return appointment.patient.nameFirst === currentApp.patient.nameFirst &&
                                    appointment.patient.nameMiddle === currentApp.patient.nameMiddle &&
                                    appointment.patient.nameLast === currentApp.patient.nameLast &&
                                    appointment.patient.birthdate === currentApp.patient.birthdate &&
                                    new Date(appointment.date) >= currentDate
                            });

                            if (existingAppointment) {
                                alert('Cannot make an appointment.\nPatients can only have 1 existing appointment at a time.')
                                return;
                            }else {
                                delete currentApp.id
                                currentApp.patient = patientMatch;
                                await axios.post('http://localhost:8000/api/appointments/', currentApp);
                                alert('Successfully made a new appointment for an new patient');
                                handleClose();
                            }
                        }else {

                            const createNewPatient = window.confirm('Patient not found.\n' +
                                'Please check your name and birthdate.\n' +
                                'Do you want to create a new patient instead?')
                            if (createNewPatient) {
                                delete currentApp.id
                                delete currentApp.patient.id
                                await axios.post('http://localhost:8000/api/patients/', currentApp.patient);
                                await axios.post('http://localhost:8000/api/appointments/', currentApp);
                                alert('Successfully made a new appointment for a new patient');
                                handleClose();
                            }else {
                                return;
                            }

                        }

                    }else {
                        // from all existing patients, find a match with exact hospital number
                        const hospitalNumberMatch = patientList.find(patient => patient.hospitalNumber === currentApp.patient.hospitalNumber);
                        if (hospitalNumberMatch) {

                            // if patient already has an appointment after current time
                            // 'Patients can only have 1 existing appointment at a time.'
                            const existingAppointment = appointmentList.find(appointment => {
                                return appointment.patient.hospitalNumber === currentApp.patient.hospitalNumber &&
                                    new Date(appointment.date) >= currentDate
                            });

                            if (existingAppointment) {
                                alert('Cannot make an appointment.\nPatients can only have 1 existing appointment at a time.')
                                return;
                            }else {
                                delete currentApp.id
                                console.log(currentApp)
                                currentApp.patient = hospitalNumberMatch;
                                await axios.post('http://localhost:8000/api/appointments/', currentApp);
                                alert('Successfully made a new appointment for an existing patient.');
                                handleClose();
                            }

                        }else {
                            alert(`Patient with hospital number ${currentApp.patient.hospitalNumber} does not exist, please leave blank if new patient.`);
                            return;
                        }
                    }
                }else { // for updating appointments
                    const patient = patientList.find(patient => patient.id === currentApp.patient.id);
                    if (JSON.stringify(patient) !== JSON.stringify(currentApp.patient)) {
                        await axios.put(`http://localhost:8000/api/patients/${currentApp.patient.id}/`, currentApp.patient);
                    }
                    const appointmentResponse = await axios.get(`http://localhost:8000/api/appointments/${currentApp.id}/`);
                    if (JSON.stringify(appointmentResponse.data) !== JSON.stringify(currentApp)) {
                        await axios.put(`http://localhost:8000/api/appointments/${currentApp.id}/`, currentApp);
                    }
                    alert('Successfully updated appointment.');
                    handleClose();
                }
                await fetchEvents();
            } catch (error) {
                console.error(error);
            }
    };

    // Fetch event happens when the component mounts
    useEffect(() => {
        fetchPatient();
    }, []);
    

    // This fetches events from the database and puts it in the state
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments/');
            const appointments = response.data.map(appointment => {
                const date = new Date(`${appointment.date}T${appointment.time}`);
                return {
                    title: appointment.appointmentNumber.substring(9,) + ' : ' + ((currentPatient.id === appointment.patient.id) ? appointment.label : ""),
                    date: date,
                    allDay: false,
                    backgroundColor: currentPatient.id === appointment.patient.id ? '#72b844' : '#108942',
                    borderColor: currentPatient.id === appointment.patient.id ? '#72b844' : '#108942',
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
            // remove "add appointments button"
            setEvents(appointments);
            setRenderKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPatient = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/patients/');
            if (hospitalNumber === "" || hospitalNumber === null) { // means new patient
                const newPatientList = response.data.filter(patient => !patient.hospitalNumber);
                const patientMatch = newPatientList.find(patient => {
                    /*return patient.nameFirst === sessionStorage.getItem('firstName') &&
                        patient.nameMiddle === sessionStorage.getItem('middleName') &&
                        patient.nameLast === sessionStorage.getItem('lastName') &&
                        patient.birthdate === sessionStorage.getItem('birthDate') */
                        
                        return patient.nameFirst === firstName &&
                        patient.nameMiddle === middleName &&
                        patient.nameLast === lastName &&
                        patient.birthdate === birthDate
                });
                
                if (patientMatch) {
                    console.log(patientMatch)
                    console.log('success')
                    alert('success')
                    setCurrentPatient(patientMatch)
                }
                
                else {
                    console.log(patientMatch)
                    console.error('not found sa response block');
                    alert('not found');
                }
            }
            else { // means old patient
                const oldPatientList = response.data.filter(patient => patient.hospitalNumber);
                const patientMatch = oldPatientList.find(patient => patient.hospitalNumber === sessionStorage.getItem('hospitalNumber'));
                if (patientMatch) {
                    setCurrentPatient(patientMatch)
                }else {
                    console.error('not found sa else block');
                    alert('not found')
                }
            }

        }catch (error) {
            console.error(error);
        }
    }

    const handleAppointmentDrag = async (info) => {
        // first get date & time
        // get appointment id
        // use appointment id to find entry in database
        // replace date & time with new date & time
        // refresh calendar

        info.revert();
        const newStartTime = info.event.start;
        const appointmentId = info.event.extendedProps.appointmentId;
        const newAppointmentInfo = {
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
            dragging: true,
            isPending: true,
        };
        try {

            await axios.put(`http://localhost:8000/api/appointments/${appointmentId}/`, newAppointmentInfo)
            
           // alert('Your change will be subject to approval.');

            fetchEvents();

            alert('Your appointment has been moved successfully.\n'
                + 'Please make sure to show up on the new right time and date.\n')

        } catch (e) {
            console.error(e);
        }

    }

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

    useEffect(() => {
        fetchEvents();
        fetchCapacity();
    }, [currentPatient]);

    // FullCalendar component that displays the calendar
    return (
        <div className="calendar">
            {isLoading ? <div>Loading...</div> : (
                <FullCalendar
                key={renderKey}
                ref={calendarRef}
                events={events}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView={currentView}
                initialDate={currentDate}
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
                viewDidMount={function(info) { // called every time the view type changes
                    if (calendarRef.current) {
                        const calendarApi = calendarRef.current.getApi();
                        if (info.view.type === 'dayGridMonth') {
                            // sets specific format for month view
                            calendarApi.setOption('dayHeaderFormat', {
                                weekday: 'short'
                            });
                            calendarApi.setOption('dayPopoverFormat', {
                                month: 'short',
                                day: 'numeric'
                            });
                        }else {
                            // sets specific format for week view
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
                // remove add appointment button when switching views
                datesSet={(info) => {
                    setEvents(prevEvents => prevEvents.filter(event => !event.addNewButton))
                    setCurrentView(info.view.type);
                    setCurrentDate(info.view.currentStart);
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
                        let filledSlots = info.num;
                        const date = new Date(info.el.closest('.fc-day').dataset.date);
                        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
                        const year = parseInt(utcDate.split('-')[0]);
                        const month = parseInt(utcDate.split('-')[1]);

                        if (monthlyCapacities) {
                            const capacity = monthlyCapacities.find(capacity => capacity.month === month && capacity.year === year);
                            if (info.view.type === 'dayGridMonth') {
                                info.el.textContent = `${filledSlots}/${capacity.capacity*10} appointments`;
                            } else {
                                info.el.textContent = `${filledSlots}/${capacity.capacity} appointments`;

                                if (filledSlots === capacity.capacity) {
                                    info.el.style.color = '#DBEA9A';
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

                        // all that remains in events are the appointments
                        // if in dayGridMonth view, disable event dragging
                        if (info.view.type === 'dayGridMonth') {
                            setEvents(prevEvents => {
                                return prevEvents.map(event => {
                                    return {
                                        ...event,
                                        editable: false
                                    };
                                });
                            });
                        } else {
                            // only allow editable for all appointments set in the future
                            // only allow editable for all appointments that match the current patient
                                setEvents(prevEvents => {
                                return prevEvents.map(event => {
                                    const eventDate = new Date(event.date);
                                    if (eventDate >= new Date() && event.extendedProps.patientId === currentPatient.id) {
                                        return {
                                            ...event,
                                            editable: true
                                        };
                                    } else {
                                        return {
                                            ...event,
                                            editable: false
                                        };
                                    }
                                });
                            });
                        }

                        // create a new appointment button that will show up on the popover of the link that was clicked
                        const year = info.date.getFullYear();
                        const month = (info.date.getMonth() + 1).toString().padStart(2, '0');
                        const day = info.date.getDate().toString().padStart(2, '0');
                        const time = info.date.getUTCHours().toString().padStart(2, '0');
                        const date = `${year}-${month}-${day}T${time}:00:00+08:00`;
                            const newAppointmentButton = {
                                title: '+ New Appointment',
                                date: date,
                                editable: false,
                                addNewButton: true,
                            };

                            // if the date is in timegridweek view &&
                            // date is available &&
                            // hour is available
                                // Add the new appointment button to the events state

                            const capacity = monthlyCapacities.find(capacity => capacity.month === parseInt(month) && capacity.year === year).capacity;
                            const filled = events.filter(event => {
                                const eventDate = new Date(event.date);
                                return event.addNewButton !== true &&
                                    eventDate.getHours() === new Date(date).getHours() &&
                                    eventDate.getDate() === new Date(date).getDate() &&
                                    eventDate.getMonth() === new Date(date).getMonth() &&
                                    eventDate.getFullYear() === new Date(date).getFullYear();
                            }).length;

                            if (info.view.type === 'timeGridWeek' &&
                                isHourAvailable(new Date(date)) &&
                                filled < capacity
                            ) {
                                setEvents(prevEvents => [...prevEvents, newAppointmentButton]);
                            }
                    }
                }
                dayCellDidMount={(info) => {
                    // if date is not available set bg to gray
                    if (!isDateAvailable(info.date)) {
                        info.el.style.backgroundColor = '#ebebeb';
                    }
                    // if date is today set bg to lighter lime green #E8F2BB
                    if (info.date.toDateString() === new Date().toDateString()) {
                        info.el.style.backgroundColor = '#E8F2BB';
                    }
                }}
                // add a badge to the day cell if there are appointments made by the current patient
                dayCellContent={(info) => {
                    // Check if there are any appointments for the current patient on this date
                    const hasAppointment = checkExistingAppointment(events, currentPatient, info);

                    // If there is an appointment, return a custom HTML string with a badge
                    if (hasAppointment) {
                        if (info.view.type === 'dayGridMonth') {
                            return {
                                html:
                                    `<div class="fc-daygrid-day-frame">
                                <span class="appointment-badge-dayGridMonth">📌</span>${info.dayNumberText}
                                </div>`
                            };
                        }
                    } else {
                        return {html: `<div class="fc-daygrid-day-frame">${info.dayNumberText}</div>`};
                    }
                }}

                dayHeaderContent={(info) => {
                    // Check if there are any appointments for the current patient on this date
                    const hasAppointment = events.some(event => {
                        const eventDate = new Date(event.date);
                        return event.extendedProps && currentPatient && eventDate.toDateString() === info.date.toDateString() && event.extendedProps.patientId === currentPatient.id;
                    });

                    // If there is an appointment, return a custom HTML string with a badge
                    if (hasAppointment) {
                        return {html: `${info.text}<span class="appointment-badge-dayHeader">📌</span>`};
                    } else {
                        // Return default day header content
                        return info.text;
                    }
                }}
                eventDrop={handleAppointmentDrag}
                slotDuration='01:00:00'
                slotMinTime='07:00:00'
                slotMaxTime='17:00:00'
                slotEventOverlap={false}
                eventMaxStack={0}
                dayMaxEvents={0}
                nowIndicator={true}
                allDaySlot={false}
                eventClick={info => {
                    // disable clicking on appointments that are not the patient's
                    if (info.event.extendedProps.patientId === currentPatient.id ||
                        info.event.extendedProps.addNewButton
                    ) {
                        handleAppointmentClick(info);
                    }
                }}
                eventAllow={(info) => {
                    return isHourAvailable(info.start);
                }}
                selectable={false}
                expandRows={true}
                editable={true}
                eventDisplay={'block'}
                />
            )}
            <AppointmentInfoModal
                show={showAppointmentInfoModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                setAppointment={setSelectedAppointment}
                handleSave={handleSave}
                handleDelete={handleDelete}
            />
            <AppointmentNewModal
                show={showAppointmentNewModal}
                handleClose={handleClose}
                appointment={selectedAppointment}
                setAppointment={setSelectedAppointment}
                patient={currentPatient}
                handleSave={handleSave}
            />
        </div>
    );

};


export default PatientCalendar;

function checkExistingAppointment(events, currentPatient, info) {
    return events.some(event => {
        const eventDate = new Date(event.date);
        return event.extendedProps && currentPatient && eventDate.toDateString() === info.date.toDateString() && event.extendedProps.patientId === currentPatient.id;
    });
}

