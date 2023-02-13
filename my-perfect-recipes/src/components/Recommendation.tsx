import React, { useState } from "react";
import axios from "axios";
import { Recipe } from "./Board/Board";

interface RecommendationProps {
  // onSubmit: (ingredients: string[]) => void;
  onSumbit: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const Recommendation: React.FC<RecommendationProps> = ({ onSumbit }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, currentIngredient]);
    setCurrentIngredient("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(ingredients);
    // implement
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recipes/recommend",
        { ingredients }
      );
      const newRecipes: Recipe[] = response.data;
      onSumbit(newRecipes);
    } catch (error) {
      console.log(error);
      alert("not recipes containing this ingredient");
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="ingredient-name"
        >
          Ingredient:
        </label>
        <input
          type="text"
          value={currentIngredient}
          onChange={handleIngredientChange}
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <button
        type="button"
        onClick={handleAddIngredient}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-3"
      >
        Add Ingredient
      </button>

      <div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Recommendation;
