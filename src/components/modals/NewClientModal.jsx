import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewClientModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    goals: [],
    allergies: '',
    medicalHistory: '',
    dietaryRestrictions: '',
    preferredTime: 'morning',
  });

  const goalOptions = [
    'Weight Management',
    'Sports Nutrition',
    'Diabetes Management',
    'Heart Health',
    'Prenatal Nutrition',
    'Digestive Health',
    'Muscle Gain',
    'Weight Loss',
    'Wellness',
    'Food Allergies',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      status: 'new',
      progress: 0,
      nextAppointment: null,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                required
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Goals
            </label>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map(goal => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${formData.goals.includes(goal)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allergies
            </label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="List any food allergies or intolerances..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Relevant medical conditions or history..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Restrictions
            </label>
            <textarea
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any dietary restrictions or preferences..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Appointment Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 7PM)</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClientModal;
