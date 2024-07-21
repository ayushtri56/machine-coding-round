import React, { useState } from 'react';
import styles from './calendar.module.css';

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const changeMonth = (offset) => {
        setDate(new Date(date.setMonth(date.getMonth() + offset)));
    };

    const handleDateClick = (day) => {
        alert(`You clicked on ${day}`);
    };

    return (
        <div className={styles.calendar}>
            <CalendarHeader date={date} changeMonth={changeMonth}/>
            <CalendarDays />
            <CalendarDates date={date} handleDateClick={handleDateClick} />
        </div>
    );
};

export default Calendar;



const CalendarHeader = ({ date, changeMonth }) => {
    const currentMonth = date.toLocaleString('default', { month: 'long' });
    const currentYear = date.getFullYear();

    return (
        <div className={styles['calendar-header']}>
            <button onClick={() => changeMonth(-1)}>Previous</button>
            <h2>{`${currentMonth} ${currentYear}`}</h2>
            <button onClick={() => changeMonth(1)}>Next</button>
        </div>
    );
};


const CalendarDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <div className={styles['calendar-days']}>
            {daysOfWeek.map((day, index) => (
                <div key={index}>{day}</div>
            ))}
        </div>
    );
};

const CalendarDates = ({ date, handleDateClick }) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const dates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        dates.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(
            <div key={`date-${i}`} onClick={() => handleDateClick(i)}>
                {i}
            </div>
        );
    }

    return <div className={styles['calendar-dates']}>{dates}</div>;
};