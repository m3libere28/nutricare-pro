import React from 'react';
import { TrendingUp, Circle } from 'lucide-react';

const NutritionSummary = ({ dailyGoals, currentTotals }) => {
  const calculatePercentage = (current, goal) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const nutritionItems = [
    {
      name: 'Calories',
      current: currentTotals.calories,
      goal: dailyGoals.calories,
      color: 'blue',
      unit: 'kcal'
    },
    {
      name: 'Protein',
      current: currentTotals.protein,
      goal: dailyGoals.protein,
      color: 'green',
      unit: 'g'
    },
    {
      name: 'Carbs',
      current: currentTotals.carbs,
      goal: dailyGoals.carbs,
      color: 'yellow',
      unit: 'g'
    },
    {
      name: 'Fat',
      current: currentTotals.fat,
      goal: dailyGoals.fat,
      color: 'red',
      unit: 'g'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Nutrition Summary</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Circle className="w-2 h-2 mr-1 fill-current" />
          Daily Goals
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nutritionItems.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.current} / {item.goal} {item.unit}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${item.color}-500 rounded-full transition-all duration-500`}
                style={{ width: `${calculatePercentage(item.current, item.goal)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={`text-${item.color}-600 font-medium`}>
                {calculatePercentage(item.current, item.goal)}%
              </span>
              {item.current > item.goal && (
                <span className="flex items-center text-red-500">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  Over goal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Recommended daily values based on your profile and goals.
          Adjust these in your settings for personalized recommendations.
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;
