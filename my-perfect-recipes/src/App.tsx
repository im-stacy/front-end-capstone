import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import RecipeList from './components/RecipeList';
import styles from './App.module.css';
import recomStyles from './components/Recommendation.module.css'
import Recommendation from './components/Recommendation';
import RecipeForm, { Ingredient } from './components/Forms/RecipeForm/RecipeForm';
import Button from './components/shared/Button/button';
import Board, { Recipe } from './components/Board/Board';
import axios from 'axios';

// type Recipe = {
//   name: string;
//   ingredients: {[key:string]: number};
//   cookingNotes: string;
// }


// const recipeData: Recipe[] = [
//   {
//     name: "Stir Fry",
//     ingredients: [{name: "Vegetables", quantity: 1}, {name: "Protein", quantity:1}, {name: "Sauce", quantity:1}],
//     cookingNotes: "1. Cut the vegetables into bite-sized pieces. 2. Heat a large pan or wok over high heat. 3. Add the protein and cook until browned. 4. Add the vegetables and stir-fry for 2-3 minutes. 5. Stir in the sauce and cook until everything is heated through."
//   },
//   {
//     name: "Grilled Cheese Sandwich",
//     ingredients: [{name: "Bread", quantity: 2}, {name: "Butter", quantity: 1}, {name: "Cheese", quantity: 1}],
//     cookingNotes: "1. Butter one side of each slice of bread. 2. Place one slice of bread, buttered side down, in a pan. 3. Place a slice of cheese on top of the bread. 4. Place the other slice of bread on top, buttered side up. 5. Cook over medium heat until the bread is golden brown and the cheese is melted, about 2-3 minutes per side."
//   },
  // {
  //   name: "Taco Salad",
  //   ingredients: {"Lettuce": 1, "Ground beef": 1, "Taco seasoning": 1, "Tomatoes": 1},
  //   cooking_notes: "1. Cook the ground beef in a pan until browned. 2. Stir in the taco seasoning. 3. Wash and chop the lettuce. 4. Dice the tomatoes. 5. Serve the ground beef over a bed of lettuce, topped with the diced tomatoes."
  // },
  // {
  //   name: "Mac and Cheese",
  //   ingredients: {"Macaroni": 1, "Cheese": 1, "Butter": 1, "Milk": 1},
  //   cooking_notes: "1. Cook the macaroni according to the package instructions. 2. In a separate pan, melt the butter. 3. Stir in the milk. 4. Gradually stir in the shredded cheese until melted and well combined. 5. Serve the cheese sauce over the cooked macaroni."
  // }
  // ];
  
  


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [recipeData, setRecipeData] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showRecomForm, setShowRecomForm] = useState(false);


  function handleSearch(text: string) {
    setSearchText(text);
    const filtered = recipeData.filter(recipe =>
      recipe.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredRecipes(filtered);
  }

  function handlePostClick() {
    setShowPostForm(!showPostForm);
  }

  const handleRecomClick = () => {
    setShowRecomForm(!showRecomForm);
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/recipes')
      .then((response) => {
        const newBoards: Recipe[] = response.data.map((recipe: any) => {
          return {
            name: recipe.name,
            ingredients:recipe.ingredients,
            cookingNotes: recipe.cooking_notes
          };
        });
        // console.log(newBoards[0].ingredients);
        setRecipeData(newBoards);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to retrieve your boards");
      });
  }, []);

  const handleSubmit = (name: string, ingredients: Ingredient[]) => {
    // implementation to post the recipe to the backend


  };
 
  return (
    <section>
      <Nav onSearch={handleSearch}/>
      <Button handleClick={handleRecomClick}/>
      {showRecomForm && 
      (<div className={recomStyles['pop-up-recommendation']}>
        <Recommendation/>
      </div>)
      };
      <h2 className={styles['center-container']}> 
      Recipe List 
      </h2>
      {/* <div className={styles['center-container']}>
        <RecipeList recipes={filteredRecipes}/>
      </div> */}
      <Board recipes={recipeData}/>
      <Button handleClick={handlePostClick}/>
      {showPostForm && <RecipeForm recipes={recipeData} setRecipeData={setRecipeData}
      />
      };
    </section>
    
  );
}

export default App;
