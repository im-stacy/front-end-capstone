import React, { useState } from 'react';
// import './board.css';

interface Recipe {
  name: string;
  ingredients: Array<{ amount: number; name: string}>;
  cookingNotes: string;
}

interface Props {
  recipes: Recipe[];
}

const Board: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="board-container grid grid-cols-1 md:grid-cols-3 gap-4">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium">{recipe.name}</h2>
        {isOpen && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Ingredients:</h3>
            <ul className="mt-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.name} ({ingredient.amount})
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-medium text-gray-700 mt-4">
              Cooking Notes:
            </h3>
            <p className="mt-2">{recipe.cookingNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};


export type {Recipe};
export default Board;
