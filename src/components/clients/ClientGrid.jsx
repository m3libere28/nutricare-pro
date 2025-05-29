import React from 'react';
import ClientCard from './ClientCard';

const ClientGrid = ({ clients, onViewProfile, onScheduleSession }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onViewProfile={onViewProfile}
          onScheduleSession={onScheduleSession}
        />
      ))}
    </div>
  );
};

export default ClientGrid;
