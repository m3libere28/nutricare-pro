import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MealPlanCalendar = ({ selectedWeek = new Date(), onWeekChange = () => {}, mealPlan = [], onAddMeal = () => {} }) => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

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
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-gray-50 border-b border-gray-200">
                <span className="sr-only">Meal Type</span>
              </th>
              {weekDays.map((day, index) => (
                <th
                  key={day}
                  className="p-4 text-left bg-gray-50 border-b border-gray-200 min-w-[200px]"
                >
                  <div className="font-medium text-gray-900">{day}</div>
                  <div className="text-sm text-gray-500">{formatDate(getDateForDay(index))}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) => (
              <tr key={mealType}>
                <td className="p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-900">
                  {mealType}
                </td>
                {weekDays.map((day, dayIndex) => {
                  const meals = mealPlan[dayIndex]?.[mealType.toLowerCase()] || [];
                  return (
                    <td
                      key={`${mealType}-${day}`}
                      className="p-4 border-b border-gray-200"
                    >
                      <div className="space-y-2">
                        {meals.map((meal, index) => (
                          <div
                            key={index}
                            className="p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center justify-between"
                          >
                            <span>{meal.name}</span>
                            <div className="text-xs text-gray-500">
                              {meal.calories} cal
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => onAddMeal(dayIndex, mealType)}
                          className="w-full p-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add {mealType}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
