import React, { useState } from 'react';
import { X, Search, Filter, Plus } from 'lucide-react';

const AddMealModal = ({ isOpen, onClose, recipes = [], onAddMeal = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiets, setSelectedDiets] = useState([]);

  if (!isOpen) return null;

  const categories = ['all', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'];

  // Default recipes if none provided
  const defaultRecipes = [
    {
      id: 1,
      name: 'Oatmeal with Berries',
      description: 'Hearty oatmeal topped with fresh berries and honey',
      calories: 350,
      category: 'Breakfast',
      tags: ['Vegetarian', 'High-Fiber'],
      image: 'https://source.unsplash.com/featured/?oatmeal'
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      description: 'Fresh mixed greens with grilled chicken breast',
      calories: 400,
      category: 'Lunch',
      tags: ['High-Protein', 'Low-Carb'],
      image: 'https://source.unsplash.com/featured/?salad'
    },
    {
      id: 3,
      name: 'Salmon with Quinoa',
      description: 'Baked salmon fillet with quinoa and roasted vegetables',
      calories: 550,
      category: 'Dinner',
      tags: ['High-Protein', 'Omega-3'],
      image: 'https://source.unsplash.com/featured/?salmon'
    }
  ];

  const allRecipes = recipes.length > 0 ? recipes : defaultRecipes;

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDiet = selectedDiets.length === 0 || 
      selectedDiets.every(diet => recipe.tags.includes(diet));
    return matchesSearch && matchesCategory && matchesDiet;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add Meal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Filter className="w-5 h-5 text-gray-400" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                  ${selectedCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {dietaryOptions.map(diet => (
              <button
                key={diet}
                onClick={() => {
                  if (selectedDiets.includes(diet)) {
                    setSelectedDiets(selectedDiets.filter(d => d !== diet));
                  } else {
                    setSelectedDiets([...selectedDiets, diet]);
                  }
                }}
                className={`px-2 py-1 rounded-md text-xs font-medium
                  ${selectedDiets.includes(diet)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{recipe.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onAddMeal(recipe);
                        onClose();
                      }}
                      className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="text-gray-500">{recipe.calories} cal</div>
                    <div className="flex items-center space-x-2">
                      {recipe.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMealModal;
