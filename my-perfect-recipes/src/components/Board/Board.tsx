import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
  name: string;
  ingredients: Array<{ amount: number; name: string }>;
  cookingNotes: string;
}

interface Props {
  recipes: Recipe[];
}

// const mockImages: string[] = ["https://images.pexels.com/photos/7218637/pexels-photo-7218637.jpeg"]

const Board: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="board-container flex flex-row flex-wrap">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export type { Recipe };
export default Board;
