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

const mockImages: string[] = [
  "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/6109498/pexels-photo-6109498.jpeg",
  "https://images.pexels.com/photos/7909829/pexels-photo-7909829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3493579/pexels-photo-3493579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4702634/pexels-photo-4702634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];
const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showRecomForm, setShowRecomForm] = useState(false);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [flag, setFlag] = useState(-1);

  function handleSearch(text: string) {
    if (text === "") {
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
    } else {
      setSearchText(text);
      const filtered = recipeData.filter((recipe) =>
        recipe.name.toLowerCase().includes(text.toLowerCase())
      );
      setRecipeData(filtered);
    }
  }

  function handlePostClick() {
    setShowPostForm(!showPostForm);
  }

  const handleRecomClick = () => {
    setShowRecomForm(!showRecomForm);
  };

  const handleIconClick = (n: number) => {
    setFlag(n);
    setIsSubMenuOpen(!isSubMenuOpen);
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
          <SideBar onClick={handleIconClick} />
        </div>
        {isSubMenuOpen && (
          <div className="flex-none w-1/3 bg-yellow-500">
            <SubMenu
              flag={flag}
              recipes={recipeData}
              setRecipeData={setRecipeData}
            />
          </div>
        )}
        <div className="flex-initial">
          <Board recipes={recipeData} mockImages={mockImages} />
        </div>
      </div>
      <Button handleClick={handleRecomClick} />
      {showRecomForm && (
        <div>
          <Recommendation onSumbit={setRecipeData} />
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
