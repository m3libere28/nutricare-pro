import React from 'react';
import { Clock, Users, Utensils, ChevronRight } from 'lucide-react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{recipe.name}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
          </div>
          <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${recipe.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
              recipe.category === 'Lunch' ? 'bg-green-100 text-green-800' :
              recipe.category === 'Dinner' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'}
          `}>
            {recipe.category}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.prepTime} min
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.servings}
            </div>
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-1" />
              {recipe.difficulty}
            </div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
