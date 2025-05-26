import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const SelectClientModal = ({ isOpen, onClose, clients = [], onSelect }) => {
  if (!isOpen) return null;
  const [searchQuery, setSearchQuery] = useState('');



  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Select Client</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredClients.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No clients found
            </div>
          ) : (
            filteredClients.map((client) => (
              <button
                key={client.id}
                onClick={() => onSelect(client)}
                className="w-full p-4 text-left bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                  <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${client.status === 'active' ? 'bg-green-100 text-green-800' :
                      client.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectClientModal;
