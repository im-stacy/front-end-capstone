import React, { useState } from 'react';
import Nav from './components/Nav';
import RecipeList from './components/RecipeList';
import styles from './App.module.css'

type Recipe = {
  name: string;
  ingredients: string[];
}

const recipeData: Recipe[] = [
{
  name: "Spaghetti Bolognese",
  ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic"],
},
{
  name: "Stir Fry",
  ingredients: ["Vegetables", "Protein", "Sauce"],
},
{
  name: "Grilled Cheese Sandwich",
  ingredients: ["Bread", "Butter", "Cheese"],
}
]


const App: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  
  function handleSearch(text: string) {
    setSearchText(text);
    const filtered = recipeData.filter(recipe =>
      recipe.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredRecipes(filtered);
  }
  return (
    <section>
    <Nav onSearch={handleSearch}/>
    <h2 className={styles['center-container']}> 
    Recipe List 
    </h2>
    <div className={styles['center-container']}>
    <RecipeList recipes={filteredRecipes}/>
    </div>
    </section>
    
  );
}

export default App;
