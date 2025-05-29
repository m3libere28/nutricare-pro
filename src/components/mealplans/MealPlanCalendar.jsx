import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import RecipeCard from './RecipeCard.jsx';

const MealPlanCalendar = ({ selectedWeek = new Date(), onWeekChange, mealPlan = [], onAddMeal }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const renderMealCell = (dayIndex, mealType) => {
    const meals = mealPlan[dayIndex]?.[mealType.toLowerCase()] || [];
    return (
      <td className="p-4 border border-gray-200">
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={meal.id} className="bg-white rounded-lg shadow-sm p-2">
              <RecipeCard recipe={meal} />
            </div>
          ))}
          <button
            onClick={() => onAddMeal(dayIndex, mealType)}
            className="w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
          >
            + Add {mealType}
          </button>
        </div>
      </td>
    );
  };

  const getDateForDay = (dayIndex) => {
    const date = new Date(selectedWeek);
    // Get to Monday first
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    date.setDate(diff);
    // Then add the days
    date.setDate(date.getDate() + dayIndex);
    return date;
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onWeekChange(-7)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            Week of {formatDate(selectedWeek)}
          </h2>
          <button
            onClick={() => onWeekChange(7)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                Time
              </th>
              {daysOfWeek.map((day) => (
                <th key={day} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mealTypes.map((mealType) => (
              <tr key={mealType}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                  {mealType}
                </td>
                {Array.from({ length: 7 }, (_, i) => renderMealCell(i, mealType))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
