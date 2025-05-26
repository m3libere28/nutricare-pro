import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AppointmentCalendar = ({ selectedDate, onDateSelect, appointments }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date && selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const hasAppointments = (date) => {
    if (!date || !appointments) return false;
    return appointments.some(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getDate() === date.getDate() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getFullYear() === date.getFullYear();
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {generateCalendarDays().map((date, index) => (
          <button
            key={index}
            onClick={() => date && onDateSelect(date)}
            disabled={!date}
            className={`
              relative aspect-square p-2 text-sm font-medium rounded-lg
              ${!date ? 'text-gray-300' : 'hover:bg-gray-100'}
              ${isToday(date) ? 'bg-blue-50 text-blue-600' : ''}
              ${isSelected(date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            `}
          >
            {date?.getDate()}
            {hasAppointments(date) && (
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
