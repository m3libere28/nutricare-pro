import React, { useState } from 'react';
import { Clock, Users, Utensils, ChevronRight, Heart, Share2, BookOpen } from 'lucide-react';

const defaultRecipeImages = {
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  lunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  dinner: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  snack: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
};

const RecipeCard = ({ recipe = {}, onClick, onSave, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  if (!recipe) {
    return null;
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div 
        onClick={onClick}
        className="cursor-pointer"
      >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={recipe.image || defaultRecipeImages[recipe.mealType?.toLowerCase()] || defaultRecipeImages.default}
          alt={recipe.name || 'Recipe'}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-gray-900">{recipe.name || 'Untitled Recipe'}</h3>
            {recipe.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
            )}
          </div>
          {recipe.calories && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {recipe.calories} cal
            </span>
          )}
        </div>

        {(recipe.prepTime || recipe.servings || recipe.difficulty) && (
          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
            {recipe.prepTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{recipe.prepTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center">
                <Utensils className="w-4 h-4 mr-1" />
                <span>{recipe.difficulty}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-1.5 rounded-full hover:bg-gray-100 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onShare) onShare(recipe);
              }}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {recipe.url && (
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
                title="View Recipe"
              >
                <BookOpen className="w-5 h-5" />
              </a>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default RecipeCard;
