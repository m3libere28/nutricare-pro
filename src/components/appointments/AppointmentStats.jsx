import React from 'react';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';

const AppointmentStats = ({ appointments }) => {
  const now = new Date();
  const today = now.toDateString();

  const stats = {
    today: appointments.filter(apt => new Date(apt.date).toDateString() === today).length,
    upcoming: appointments.filter(apt => new Date(apt.date) > now).length,
    total: appointments.length,
    uniqueClients: new Set(appointments.map(apt => apt.clientName)).size
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Today's Sessions</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.today}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.upcoming}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Sessions</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Clients</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.uniqueClients}</p>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStats;
