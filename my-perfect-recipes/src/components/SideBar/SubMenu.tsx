import React from "react";
import Recipe from "../Recipe";
import RecipeForm from "../Forms/RecipeForm/RecipeForm";
import Recommendation from "../Recommendation";

interface SubMenuProps {
  flag: number;
  recipes: any;
  setRecipeData: any;
}

const SubMenu: React.FC<SubMenuProps> = ({ flag, recipes, setRecipeData }) => {
  return (
    <div className="h-full text-black shadow-lg">
      <div className="p-4">
        {flag === 1 && (
          <RecipeForm
            recipes={recipes}
            setRecipeData={setRecipeData}
          ></RecipeForm>
        )}
        {flag === 0 && (
          <Recommendation onSumbit={setRecipeData}></Recommendation>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
