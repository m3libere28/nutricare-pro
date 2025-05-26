import React from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';

const AppointmentList = ({ appointments, selectedDate, onEditAppointment }) => {
  const filteredAppointments = appointments
    .filter(apt => {
      if (!selectedDate) return true;
      const aptDate = new Date(apt.date);
      return aptDate.getDate() === selectedDate.getDate() &&
        aptDate.getMonth() === selectedDate.getMonth() &&
        aptDate.getFullYear() === selectedDate.getFullYear();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getAppointmentStatus = (appointment) => {
    const now = new Date();
    const aptDate = new Date(appointment.date);
    aptDate.setHours(parseInt(appointment.time.split(':')[0]));
    aptDate.setMinutes(parseInt(appointment.time.split(':')[1]));

    if (aptDate < now) return 'completed';
    if (aptDate.toDateString() === now.toDateString()) return 'today';
    return 'upcoming';
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-gray-500">
            {selectedDate ? 'No appointments scheduled for this date' : 'No upcoming appointments'}
          </p>
        </div>
      ) : (
        filteredAppointments.map((appointment, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`
                  w-2 h-2 mt-2 rounded-full
                  ${getAppointmentStatus(appointment) === 'completed' ? 'bg-gray-400' :
                    getAppointmentStatus(appointment) === 'today' ? 'bg-green-500' :
                    'bg-blue-500'}
                `} />
                <div>
                  <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1.5" />
                      {appointment.clientName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {formatTime(appointment.time)} ({appointment.duration} min)
                    </div>
                    {appointment.notes && (
                      <div className="flex items-start text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-1.5 mt-0.5" />
                        <span className="line-clamp-2">{appointment.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEditAppointment(appointment)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;
