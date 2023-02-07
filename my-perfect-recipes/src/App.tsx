import React, { useState } from 'react';
import Nav from './components/Nav';
import RecipeList from './components/RecipeList';
import styles from './App.module.css';
import postStyles from './components/RecipeForm.module.css';
import recomStyles from './components/Recommendation.module.css'
import Recommendation from './components/Recommendation';
import RecipeForm, { Ingredient } from './components/RecipeForm';

type Recipe = {
  name: string;
  ingredients: {[key:string]: number};
}


const recipeData: Recipe[] = [
{
  name: "Spaghetti Bolognese",
  ingredients: {"Spaghetti": 1, "Ground beef": 1, "Tomato sauce": 1, "Onion": 1, "Garlic": 1}
},
{
  name: "Stir Fry",
  ingredients: {"Vegetables": 1, "Protein": 1, "Sauce": 1},
},
{
  name: "Grilled Cheese Sandwich",
  ingredients: {"Bread": 1, "Butter": 1, "Cheese": 1},
},
{
  name: "Taco Salad",
  ingredients: {"Lettuce": 1, "Ground beef": 1, "Taco seasoning": 1, "Tomatoes": 1},
},
{
  name: "Mac and Cheese",
  ingredients: {"Macaroni": 1, "Cheese": 1, "Butter": 1, "Milk": 1},
}
]


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('')
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

  function handleRecomClick() {
    setShowRecomForm(!showRecomForm);
  }

  // const handleSubmit = (name: string, ingredients: Ingredient[]) => {
  //   // implementation to post the recipe to the backend


  // };
 
  return (
    <section>
      <Nav onSearch={handleSearch}/>
      <button className={styles['recom-button']} onClick={handleRecomClick}>Recommendation</button>
      {showRecomForm && 
      (<div className={recomStyles['pop-up-recommendation']}>
        <Recommendation/>
      </div>)
      };
      <h2 className={styles['center-container']}> 
      Recipe List 
      </h2>
      <div className={styles['center-container']}>
        <RecipeList recipes={filteredRecipes}/>
      </div>
      <button className={styles['post-button']} onClick={handlePostClick}>POST</button>
      {showPostForm && 
      (<div className={postStyles['popup-container']}>
        <RecipeForm/>
      </div>)
      };
    </section>
    
  );
}

export default App;
