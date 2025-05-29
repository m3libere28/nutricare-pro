import React from 'react';
import { Activity, Calendar, Clock, TrendingUp } from 'lucide-react';

const AssessmentStats = ({ assessments = [] }) => {
  const stats = {
    total: assessments.length,
    thisMonth: assessments.filter(a => {
      const date = new Date(a.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    pending: assessments.filter(a => a.status === 'Pending Review').length,
    completionRate: assessments.length > 0
      ? Math.round((assessments.filter(a => a.status === 'Completed').length / assessments.length) * 100)
      : 0
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Assessments</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.thisMonth}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.completionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStats;
