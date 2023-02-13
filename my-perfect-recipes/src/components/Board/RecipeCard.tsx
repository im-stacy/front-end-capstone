import { useState } from "react";
import { Recipe } from "./Board";

interface RecipeCardProps {
  recipe: Recipe;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="card bg-base-100 basis-1/4 shadow-xl p-5 m-3.5  rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <figure>
        <img
          className="object-fill h-8/12  rounded-t-md"
          src={image}
          alt="Food"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title  font-bold text-2xl mb-2">{recipe.name}</h2>
        {isOpen && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700  mb-1">
              Ingredients:
            </h3>
            <ul className="mt-2  list-disc list-inside">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.name} ({ingredient.amount})
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-medium text-gray-700 mt-4  mb-1">
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
