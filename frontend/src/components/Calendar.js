import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from "axios";
import FormInput from './FormInput';
import bootstrap from 'bootstrap';
import './Calendar.css';


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
            setEvents(res.data.map(appointment => {
                const dateTime = new Date(appointment.date + 'T' + appointment.time);
                return {
                    title: appointment.patient,
                    date: dateTime,
                    allDay: false
                };
            }));
        })
        .catch(err => console.log(err));
    }, []);


    const handleSubmit = (e) => {
    e.preventDefault();
    if (eventTitle === '' || eventDate === '') {
        alert('Please fill in all fields');
    } else {
        const newEvent = {
            patient: eventTitle, // Assuming eventTitle is the patient
            date: eventDate.split('T')[0], // Extract date from datetime
            time: eventDate.split('T')[1] // Extract time from datetime
        };
        axios.post('http://localhost:8000/api/appointments/', newEvent)
            .then(res => {
                setEvents([...events, {
                    title: res.data.patient,
                    date: new Date(res.data.date + 'T' + res.data.time),
                    allDay: false
                }]);
                setEventTitle('');
                setEventDate('');
            })
            .catch(err => console.log(err));
    }
}

const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/appointments/${id}`)
        .then(res => {
            setEvents(events.filter(event => event.id !== id)); // Assuming each event has an id property
        })
        .catch(err => console.log(err));
}


   return (

       <>
       <div class = 'container'>
       <section className="flex flex-col justify-center items-center px-16 py-12 min-h-screen">
               <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                   <FormInput type="text" placeholder="Event Name" name="eventTitle" className="w-[369px]" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                   <FormInput type="date" placeholder="Event Date" name="eventDate" className="w-[369px]" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                   <button type="submit" className="px-4 py-1 bg-black text-white rounded">SUBMIT</button>
                   <button type="button" className="px-4 py-1 bg-red-500 text-white rounded" onClick={() => setEvents([])}>CLEAR</button>
               </form>
               <div className="calendar">
                   <FullCalendar
                       plugins={[dayGridPlugin, timeGridPlugin]}
                       initialView="dayGridMonth"
                       style={centered}
                       headerToolbar={{
                           left: 'prev,next today',
                           center: 'title',
                           right: 'dayGridMonth,timeGridWeek,timeGridDay',
                       }}
                       slotDuration='01:00:00'
                       slotEventOverlap={false}
                       dayMaxEventRows={0}
                       events={events}
                       displayEventTime={false}
                   />
               </div>
           </section></div></>
            );
}

export default Calendar;

(function() {
    "use strict"; // Start of use strict
  
    var sidebar = document.querySelector('.sidebar');
    var sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop');
    
    if (sidebar) {
      
      var collapseEl = sidebar.querySelector('.collapse');
      var collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'))
      var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
        return new bootstrap.Collapse(collapseEl, { toggle: false });
      });
  
      for (var toggle of sidebarToggles) {
  
        // Toggle the side navigation
        toggle.addEventListener('click', function(e) {
          document.body.classList.toggle('sidebar-toggled');
          sidebar.classList.toggle('toggled');
  
          if (sidebar.classList.contains('toggled')) {
            for (var bsCollapse of sidebarCollapseList) {
              bsCollapse.hide();
            }
          };
        });
      }
  
      // Close any open menu accordions when window is resized below 768px
      window.addEventListener('resize', function() {
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
        if (vw < 768) {
          for (var bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        };
      });
    }
  
    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    
    var fixedNaigation = document.querySelector('body.fixed-nav .sidebar');
    
    if (fixedNaigation) {
      fixedNaigation.on('mousewheel DOMMouseScroll wheel', function(e) {
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
        if (vw > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });
    }
  
    var scrollToTop = document.querySelector('.scroll-to-top');
    
    if (scrollToTop) {
      
      // Scroll to top button appear
      window.addEventListener('scroll', function() {
        var scrollDistance = window.pageYOffset;
  
        //check if user is scrolling up
        if (scrollDistance > 100) {
          scrollToTop.style.display = 'block';
        } else {
          scrollToTop.style.display = 'none';
        }
      });
    }
  
  })(); // End of use strict
  