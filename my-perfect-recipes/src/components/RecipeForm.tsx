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

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeFormProps {
  // onSubmit: (name: string, ingredients: Ingredient[]) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentIngredientName, setCurrentIngredientName] = useState("");
  const [currentIngredientQuantity, setCurrentIngredientQuantity] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // implement backend post logic
  };

  const handleIngredientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredientName(event.target.value);
  };

  const handleIngredientQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredientQuantity(event.target.value);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: currentIngredientName, quantity: currentIngredientQuantity }]);
    setCurrentIngredientName("");
    setCurrentIngredientQuantity("");
  };

  return (
    <form className={styles['popup-form']} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipe-name">Recipe Name:</label>
        <input
          type="text"
          id="recipe-name"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ingredient-name">Ingredient Name:</label>
        <input
          type="text"
          id="ingredient-name"
          value={currentIngredientName}
          onChange={handleIngredientNameChange}
        />
        <label htmlFor="ingredient-quantity">Ingredient Quantity:</label>
        <input
          type="text"
          id="ingredient-quantity"
          value={currentIngredientQuantity}
          onChange={handleIngredientQuantityChange}
        />
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
      </div>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>
      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export type { Ingredient };
export default RecipeForm;