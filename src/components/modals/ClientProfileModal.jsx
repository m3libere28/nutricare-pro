import React, { useState } from 'react';
import { X, Calendar, Clock, Activity, FileText, MessageSquare } from 'lucide-react';

const ClientProfileModal = ({ isOpen, onClose, client }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !client) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'progress', name: 'Progress', icon: Activity },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
  ];

  const appointments = [
    { date: '2025-06-02', time: '10:00 AM', type: 'Initial Consultation', status: 'upcoming' },
    { date: '2025-05-15', time: '2:30 PM', type: 'Follow-up', status: 'completed' },
    { date: '2025-05-01', time: '11:00 AM', type: 'Initial Consultation', status: 'completed' },
  ];

  const progressData = [
    { date: '2025-05-01', weight: 180, bodyFat: 25, notes: 'Initial measurements' },
    { date: '2025-05-15', weight: 178, bodyFat: 24, notes: 'Good progress' },
    { date: '2025-06-01', weight: 175, bodyFat: 23, notes: 'Consistent improvement' },
  ];

  const notes = [
    { date: '2025-05-01', title: 'Initial Assessment', content: 'Client shows high motivation for lifestyle changes.' },
    { date: '2025-05-15', title: 'Progress Check', content: 'Following meal plan consistently. Sleep patterns improving.' },
    { date: '2025-06-01', title: 'Monthly Review', content: 'Meeting all targets. Ready to advance exercise intensity.' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={client.image}
              alt={client.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Age</span>
                      <span className="text-gray-900">{client.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="text-gray-900">{client.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${client.status === 'active' ? 'bg-green-100 text-green-800' :
                          client.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Health Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.goals.map((goal, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Progress Overview</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Overall Progress</span>
                    <span className="text-gray-900">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Appointment History</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600">
                  Schedule New
                </button>
              </div>
              <div className="space-y-4">
                {appointments.map((apt, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{apt.type}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(apt.date).toLocaleDateString()} at {apt.time}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${apt.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (lbs)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Fat %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {progressData.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.bodyFat}%</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Session Notes</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600">
                  Add Note
                </button>
              </div>
              <div className="space-y-4">
                {notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{note.title}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Messages</h3>
              <p className="mt-2 text-gray-500">Start a conversation with {client.name}</p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600">
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfileModal;
