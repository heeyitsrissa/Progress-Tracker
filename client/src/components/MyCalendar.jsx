import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ todos, selectedDate, setSelectedDate}) => {
    const events = todos.map(todo => ({
        title: todo.title,
        start: new Date(todo.start),
        end: new Date(todo.end),
    }));

    return (
        <div className='calendar'>
            <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="week" 
            onNavigate={(date) => setSelectedDate(date)}
            views={['day', 'week', 'month']}
            />
        </div>
    )
}

export default MyCalendar;