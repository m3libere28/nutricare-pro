import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceGrid = ({ resources, onSaveResource }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {resources.map((resource) => (
        <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <ResourceCard
            resource={resource}
            onSave={onSaveResource}
          />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ResourceGrid;
