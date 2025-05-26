import React from 'react';
import { ChevronRight, FileText } from 'lucide-react';

const AssessmentList = ({ assessments, onViewAssessment }) => {
  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{assessment.clientName}</h3>
                <p className="text-sm text-gray-500">{assessment.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {new Date(assessment.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{assessment.status}</p>
              </div>
              <button
                onClick={() => onViewAssessment(assessment)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssessmentList;
