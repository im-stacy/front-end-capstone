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
import styles from './RecipeForm.module.css';
import List from "./List";
import { AddIngredientButton, FormContainer, IngredientContainer, IngredientName, IngredientQuantity, CookingNotes, RecipeName, SubmitRecipeButton } from "../../shared/styled-components";
import axios from "axios";
import { Recipe } from "../../Board/Board";

interface FormData {
  name: string;
  cooking_notes: string;
  ingredients_data: {[key:string]: number};
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
  const [currentIngredientQuantity, setCurrentIngredientQuantity] = useState("");
  const [currentCookingNotes, setCurrentCookingNotes] = useState("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ingredientsMap: { [key: string]: string } = {};
    ingredients.forEach(ingredient => {
      ingredientsMap[ingredient.name] = ingredient.amount;
    });

    try {
      const newRecipe = {
        name: recipeName,
        cooking_notes: currentCookingNotes,
        ingredients: ingredientsMap
      }
      await axios.post('http://127.0.0.1:5000/recipes', newRecipe);
      setCurrentCookingNotes("");
      const newRecipes = [...RecipeFormProps.recipes];
      const ingredientsArray: {
        name: string;
        amount: number;
      }[] = [];
      ingredients.forEach(ingredient => {
        ingredientsArray.push({
          name: ingredient.name, amount: parseInt(ingredient.amount)
        })});

      newRecipes.push({
        name: newRecipe.name,
        ingredients: ingredientsArray,
        cookingNotes: newRecipe.cooking_notes
      });
      RecipeFormProps.setRecipeData(newRecipes);

      console.log("all good");
    } catch (error) {
      // Add code to handle an error here
      console.log("not good");
    }
    
  };

  const handleIngredientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredientName(event.target.value);
  };

  const handleIngredientQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredientQuantity(event.target.value);
  };

  const handleCookingNotesChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCookingNotes(event.target.value);
  };
  
  const addIngredient = () => {
    setIngredients([...ingredients, { name: currentIngredientName, amount: currentIngredientQuantity }]);
    setCurrentIngredientName("");
    setCurrentIngredientQuantity("");
  };

  return (
    <FormContainer>
      <form className={styles['popup-form']} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipe-name">Recipe Name:</label>
          <RecipeName
            type="text"
            id="recipe-name"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
          />
        </div>
        <IngredientContainer>
          <label htmlFor="ingredient-name">Ingredient Name:</label>
          <IngredientName
            type="text"
            id="ingredient-name"
            value={currentIngredientName}
            onChange={handleIngredientNameChange}
          />
          <label htmlFor="ingredient-quantity">Ingredient Quantity:</label>
          <IngredientQuantity
            type="text"
            id="ingredient-quantity"
            value={currentIngredientQuantity}
            onChange={handleIngredientQuantityChange}
          />
          <label htmlFor="cooking-notes">Cooking Notes:</label>
          <CookingNotes
            type="text"
            id="cooking-notes"
            value={currentCookingNotes}
            onChange={handleCookingNotesChange}
          />
          <AddIngredientButton type="button" onClick={addIngredient}>
            Add Ingredient
          </AddIngredientButton>
        </IngredientContainer>
        <List ingredients={ingredients}/>
        <SubmitRecipeButton type="submit">Submit Recipe</SubmitRecipeButton>
      </form>
    </FormContainer>
  );
};

export type { Ingredient };
export default RecipeForm;