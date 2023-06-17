import React, { useState } from "react";

const Calendar = ({ className, setDate }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth - 1;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11; // December
      }
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + 1;
      if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; // January
      }
      return newMonth;
    });
  };

  // Generate an array of dates for the current month
  const generateCalendarDates = () => {
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const dates = [];

    // Fill the preceding days with empty placeholders
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(null);
    }

    // Generate the dates for the month
    for (let i = 1; i <= numDaysInMonth; i++) {
      dates.push(new Date(currentYear, currentMonth, i));
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  return (
    <div className={`container mx-auto p-4 ${className}`}>
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2 className="text-lg font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
        {calendarDates.map((date, index) => (
          <div
            key={index}
            className={`text-center ${date ? "cursor-pointer" : ""} ${
              selectedDate && date && selectedDate.getDate() === date.getDate()
                ? "bg-blue-500 text-white"
                : ""
            } py-2`}
            onClick={() => handleDateClick(date)}
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
