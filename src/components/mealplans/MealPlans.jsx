import React, { useState } from 'react';
import MealPlanCalendar from './MealPlanCalendar.jsx';
import AddMealModal from './AddMealModal.jsx';

const MealPlans = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [selectedMealInfo, setSelectedMealInfo] = useState(null);
  const [mealPlan, setMealPlan] = useState([
    // Monday
    {
      breakfast: [
        {
          id: 1,
          name: 'Greek Yogurt Parfait',
          calories: 350,
          prepTime: '10 min',
          servings: 1,
          difficulty: 'Easy',
          description: 'Creamy Greek yogurt layered with fresh berries, honey, and granola',
          mealType: 'breakfast',
          url: 'https://www.eatingwell.com/recipe/273275/greek-yogurt-parfait/',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        }
      ],
      lunch: [
        {
          id: 2,
          name: 'Grilled Chicken Salad',
          calories: 400,
          prepTime: '20 min',
          servings: 1,
          difficulty: 'Medium',
          description: 'Fresh mixed greens topped with grilled chicken breast, avocado, and balsamic vinaigrette',
          mealType: 'lunch',
          url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/grilled-chicken-salad-recipe-2112254',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        }
      ],
      dinner: [
        {
          id: 3,
          name: 'Salmon with Quinoa',
          calories: 550,
          prepTime: '30 min',
          servings: 2,
          difficulty: 'Medium',
          description: 'Pan-seared salmon served with fluffy quinoa and roasted seasonal vegetables',
          mealType: 'dinner',
          url: 'https://www.simplyrecipes.com/recipes/grilled_salmon_with_quinoa/',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        }
      ],
      snacks: []
    },
    // Rest of the week...
    {}, {}, {}, {}, {}, {}
  ]);

  const handleWeekChange = (days) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + days);
    setSelectedWeek(newDate);
  };

  const handleShare = (recipe) => {
    navigator.clipboard.writeText(
      `Check out this recipe: ${recipe.name}\n${recipe.description}\n${recipe.url || window.location.href}`
    );
    // You would typically show a notification here
  };

  const handleAddMeal = (dayIndex, mealType) => {
    setSelectedMealInfo({ dayIndex, mealType: mealType.toLowerCase() });
    setShowAddMealModal(true);
  };

  const handleMealSelect = (recipe) => {
    // Add mealType to the recipe based on selectedMealInfo
    recipe.mealType = selectedMealInfo?.mealType;
    if (selectedMealInfo) {
      const { dayIndex, mealType } = selectedMealInfo;
      const newMealPlan = [...mealPlan];
      if (!newMealPlan[dayIndex]) {
        newMealPlan[dayIndex] = {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        };
      }
      if (!newMealPlan[dayIndex][mealType]) {
        newMealPlan[dayIndex][mealType] = [];
      }
      newMealPlan[dayIndex][mealType].push({
        id: recipe.id || Math.random().toString(36).substr(2, 9),
        name: recipe.name || 'Untitled Recipe',
        calories: recipe.calories || 0,
        image: recipe.image || 'https://source.unsplash.com/featured/800x600/?food'
      });
      setMealPlan(newMealPlan);
    }
    setShowAddMealModal(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Meal Plans</h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan and track meals for your clients
          </p>
        </div>

        <MealPlanCalendar
          selectedWeek={selectedWeek}
          onWeekChange={handleWeekChange}
          mealPlan={mealPlan}
          onAddMeal={handleAddMeal}
        />

        <AddMealModal
          isOpen={showAddMealModal}
          onClose={() => setShowAddMealModal(false)}
          onAddMeal={handleMealSelect}
          onShare={handleShare}
        />
      </div>
    </div>
  );
};

export default MealPlans;
