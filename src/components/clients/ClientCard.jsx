import React from 'react';
import { Calendar, Phone, Mail, Target } from 'lucide-react';

const ClientCard = ({ client, onViewProfile, onScheduleSession }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              src={client.image}
              alt={client.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {client.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                client.status === 'active' ? 'bg-green-100 text-green-800' :
                client.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="w-4 h-4 mr-2" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="w-4 h-4 mr-2" />
            <span className="truncate">{client.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Target className="w-4 h-4 mr-2" />
            <span className="truncate">{client.goals.join(', ')}</span>
          </div>
          {client.nextSession && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Next Session: {new Date(client.nextSession).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => onViewProfile(client)}
            className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Profile
          </button>
          <button
            onClick={() => onScheduleSession(client)}
            className="flex-1 text-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
