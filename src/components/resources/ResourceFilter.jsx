import React from 'react';
import { BookOpen, Video, Globe, Building2 } from 'lucide-react';

const ResourceFilter = ({ activeType, onTypeChange }) => {
  const types = [
    { id: 'all', label: 'All Resources', icon: null },
    { id: 'article', label: 'Articles', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'website', label: 'Websites', icon: Globe },
    { id: 'organization', label: 'Organizations', icon: Building2 }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map(type => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeType === type.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {type.label}
          </button>
        );
      })}
    </div>
  );
};

export default ResourceFilter;
