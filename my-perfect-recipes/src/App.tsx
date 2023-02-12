import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import RecipeList from "./components/RecipeList";
import styles from "./App.module.css";
import recomStyles from "./components/Recommendation.module.css";
import Recommendation from "./components/Recommendation";
import RecipeForm, {
  Ingredient,
} from "./components/Forms/RecipeForm/RecipeForm";
import Button from "./components/shared/Button/button";
import Board, { Recipe } from "./components/Board/Board";
import axios from "axios";
import SideBar from "./components/SideBar/SideBar";
import SubMenu from "./components/SideBar/SubMenu";

const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showRecomForm, setShowRecomForm] = useState(false);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  function handleSearch(text: string) {
    setSearchText(text);
    const filtered = recipeData.filter((recipe) =>
      recipe.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }

  function handlePostClick() {
    setShowPostForm(!showPostForm);
  }

  const handleRecomClick = () => {
    setShowRecomForm(!showRecomForm);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/recipes")
      .then((response) => {
        const newBoards: Recipe[] = response.data.map((recipe: any) => {
          return {
            name: recipe.name,
            ingredients: recipe.ingredients,
            cookingNotes: recipe.cooking_notes,
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
      <Nav onSearch={handleSearch} />
      <div className="flex flex-row justify-start">
        <div className="flex-none">
          <SideBar isSubMenuOpen={isSubMenuOpen} onClick={setIsSubMenuOpen} />
        </div>
        {isSubMenuOpen && (
          <div className="flex-none w-1/3 bg-yellow-500">
            <SubMenu />
          </div>
        )}
        <div className="flex-initial">
          <Board recipes={recipeData} />
        </div>
      </div>
      <Button handleClick={handleRecomClick} />
      {showRecomForm && (
        <div>
          <Recommendation />
        </div>
      )}
      ;
      <Button handleClick={handlePostClick} />
      {showPostForm && (
        <RecipeForm recipes={recipeData} setRecipeData={setRecipeData} />
      )}
      ;
    </section>
  );
};

export default App;
