import React from 'react';
import { X, Clock, Users, ChefHat, Utensils, Scale } from 'lucide-react';

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{recipe.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="aspect-video w-full relative">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime} min</span>
                    <Users className="w-4 h-4 ml-2" />
                    <span>{recipe.servings} servings</span>
                    <Utensils className="w-4 h-4 ml-2" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/20 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{recipe.calories}</div>
                  <div className="text-sm opacity-90">calories per serving</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-blue-600 font-medium">Protein</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{recipe.nutrition.protein}g</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-green-600 font-medium">Carbs</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{recipe.nutrition.carbs}g</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-yellow-600 font-medium">Fat</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{recipe.nutrition.fat}g</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-purple-600 font-medium">Fiber</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{recipe.nutrition.fiber}g</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-2" />
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600"
          >
            Add to Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
