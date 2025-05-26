import React from 'react';
import { 
  BookOpen, 
  Video, 
  Globe, 
  Building2, 
  ExternalLink, 
  Calendar,
  Clock,
  BookmarkPlus
} from 'lucide-react';

const ResourceCard = ({ resource, onSave }) => {
  const iconMap = {
    article: BookOpen,
    video: Video,
    website: Globe,
    organization: Building2
  };

  const Icon = iconMap[resource.type] || BookOpen;
  const isPeerReviewed = resource.type === 'article' && resource.peerReviewed;

  const handleClick = () => {
    if (resource.url) {
      window.open(resource.url, 'nutricare_resource');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${
              resource.type === 'article' ? 'bg-blue-50 text-blue-600' :
              resource.type === 'video' ? 'bg-red-50 text-red-600' :
              resource.type === 'website' ? 'bg-purple-50 text-purple-600' :
              'bg-green-50 text-green-600'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-500">
                {resource.author || resource.organization}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSave(resource)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-gray-600 text-sm line-clamp-2">
          {resource.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {resource.date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(resource.date).getFullYear()}</span>
              </div>
            )}
            {resource.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            {isPeerReviewed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Peer Reviewed
              </span>
            )}
          </div>
          <button
            onClick={handleClick}
            className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>View Resource</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
