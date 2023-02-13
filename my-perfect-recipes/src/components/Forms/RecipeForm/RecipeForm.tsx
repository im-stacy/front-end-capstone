// import React, { useState } from 'react';

// type RecipeProps = {
//     name: string;
//     ingredients: {[key:string]: number};
//     }

// const Post: React.FC = () => {
//     const [recipe, setRecipe] = useState<RecipeProps>({
//         name: '',
//         ingredients: {}
//     });

//     function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//         const { name, value } = e.target;
//         setRecipe({ ...recipe, [name]: value });
//     }

//     function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//         <label>
//             Recipe Name:
//             <input type="text" name="name" value={recipe.name} onChange={handleChange} />
//         </label>
//         <label>
//             Ingredients:
//             <input type="text" name="ingredients" value={recipe.ingredients.value} onChange={handleChange} />
//         </label>
//         <button type="submit">Post</button>
//         </form>
//     );
//     }

// export default Post;

import React, { useState } from "react";
import styles from "./RecipeForm.module.css";
import List from "./List";
import axios from "axios";
import { Recipe } from "../../Board/Board";

interface FormData {
  name: string;
  cooking_notes: string;
  ingredients_data: { [key: string]: number };
}

interface Ingredient {
  name: string;
  amount: string;
}

interface ListItemProps {
  id: string;
  ingredient: Ingredient;
  onRemove: (id: string) => void;
}

interface RecipeFormProps {
  // onSubmit: (name: string, ingredients: Ingredient[]) => void;
  recipes: Recipe[];
  setRecipeData: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeForm: React.FC<RecipeFormProps> = (RecipeFormProps) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentIngredientName, setCurrentIngredientName] = useState("");
  const [currentIngredientQuantity, setCurrentIngredientQuantity] =
    useState("");
  const [currentCookingNotes, setCurrentCookingNotes] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ingredientsMap: { [key: string]: string } = {};
    ingredients.forEach((ingredient) => {
      ingredientsMap[ingredient.name] = ingredient.amount;
    });

    try {
      const newRecipe = {
        name: recipeName,
        cooking_notes: currentCookingNotes,
        ingredients: ingredientsMap,
      };
      await axios.post("http://127.0.0.1:5000/recipes", newRecipe);
      setCurrentCookingNotes("");
      const newRecipes = [...RecipeFormProps.recipes];
      const ingredientsArray: {
        name: string;
        amount: number;
      }[] = [];
      ingredients.forEach((ingredient) => {
        ingredientsArray.push({
          name: ingredient.name,
          amount: parseInt(ingredient.amount),
        });
      });

      newRecipes.push({
        name: newRecipe.name,
        ingredients: ingredientsArray,
        cookingNotes: newRecipe.cooking_notes,
      });
      RecipeFormProps.setRecipeData(newRecipes);

      console.log("all good");
    } catch (error) {
      // Add code to handle an error here
      console.log("not good");
    }
  };

  const handleIngredientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentIngredientName(event.target.value);
  };

  const handleIngredientQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentIngredientQuantity(event.target.value);
  };

  const handleCookingNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentCookingNotes(event.target.value);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: currentIngredientName, amount: currentIngredientQuantity },
    ]);
    setCurrentIngredientName("");
    setCurrentIngredientQuantity("");
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="recipe-name"
        >
          Recipe Name:
        </label>
        <input
          type="text"
          id="recipe-name"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="ingredient-name"
        >
          Ingredient Name:
        </label>
        <input
          type="text"
          id="ingredient-name"
          value={currentIngredientName}
          onChange={handleIngredientNameChange}
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label>Ingredient Quantity:</label>
        <input
          type="text"
          id="ingredient-quantity"
          value={currentIngredientQuantity}
          onChange={handleIngredientQuantityChange}
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="cooking-notes"
        >
          Cooking Notes:
        </label>
        <input
          type="text"
          id="cooking-notes"
          value={currentCookingNotes}
          onChange={handleCookingNotesChange}
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <button
        type="button"
        onClick={addIngredient}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Ingredient
      </button>

      {/* <List ingredients={ingredients}/> */}
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export type { Ingredient };
export default RecipeForm;
