import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceGrid = ({ resources, onSaveResource }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onSave={onSaveResource}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;
