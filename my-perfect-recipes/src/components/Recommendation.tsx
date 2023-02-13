// import React, { useState } from 'react';

// type RecipeProps = {
// name: string;
// ingredients: {[key:string]: number};
// }

// type Props = {
//     recipeData: RecipeProps[]
// }

// const Recommendation: React.FC<Props> = ({recipeData}) => {
//     const [ingredients, setIngredients] = useState({});
//     const [recommendedRecipes, setRecommendedRecipes] = useState<RecipeProps[]>([]);
//     const [showInput, setShowInput] = useState(false);
//     const imageUrl = '/Users/stacyji/Downloads/cookingPot.png'

//     function handleInputIngredients(e: React.ChangeEvent<HTMLInputElement>) {
//         const { name, value } = e.target;
//         setIngredients((prevIngredients) => ({ ...prevIngredients, [name]: value }));
//     }

//     function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();

//         const filtered = recipeData.filter((recipe) => {
//             return Object.keys(ingredients).every((ingredient) =>
//             recipe.ingredients.hasOwnProperty(ingredient)
//             );
//         });
//         setRecommendedRecipes(filtered);
//     }

//     return (
//         <div>
//             <img src={imageUrl} alt="recom button" onClick={() => setShowInput(!showInput)}/>
//             {showInput && (
//             <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Enter ingredients"
//                 name="ingredients"
//                 onChange={handleInputIngredients}
//             />
//             <button type="submit">Submit</button>
//             </form>
//             )}
//         <ul>
//             {recommendedRecipes.map((recipe, index) => (
//                 <li key={index}>{recipe.name}</li>
//             ))}
//         </ul>
//         </div>
//     );
// };

// // export default Recommendation;
// import React, { useState } from 'react';
// import styles from './Recommendation.module.css';

// type Recipe = {
//   name: string;
//   ingredients: {[key:string]: number};
// }

// type RecommendationProps = {
//   recipeData: Recipe[];
// };

// const Recommendation: React.FC<RecommendationProps> = ({ recipeData }) => {
//   const [showInput, setShowInput] = useState(false);
//   const [ingredients, setIngredients] = useState('');

//   function handleClick() {
//     setShowInput(!showInput);
//   }

//   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setIngredients(event.target.value);
//   }

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     // Perform the recommendation logic here with the entered ingredients
//     console.log(ingredients);
//   }

//   return (
//     <div>
//       <img onClick={handleClick} src='path/to/your/image' alt='Recommend' />
//       {showInput && (
//         <div className={styles['pop-up-recommendation']}>
//           <h2>Enter ingredients:</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" value={ingredients} onChange={handleChange} />
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recommendation;

import React, { useState } from "react";
import styles from "./Recommendation.module.css";
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
    }
  };

  return (
    <form className={styles["pop-up-form"]} onSubmit={handleSubmit}>
      <div>
        <label>
          Ingredient:
          <input
            type="text"
            value={currentIngredient}
            onChange={handleIngredientChange}
          />
        </label>
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
      <div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Recommendation;
