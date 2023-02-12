import { useState } from "react";
import { Recipe } from "./Board";

interface RecipeCardProps {
  recipe: Recipe;
  //   image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="card bg-base-100 basis-1/3 shadow-xl p-5"
      onClick={() => setIsOpen(!isOpen)}
    >
      <figure>
        <img
          className="object-fill h-8/12"
          src="https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Food"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
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

export default RecipeCard;
