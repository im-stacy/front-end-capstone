import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
  name: string;
  ingredients: Array<{ amount: number; name: string }>;
  cookingNotes: string;
}

interface Props {
  recipes: Recipe[];
  mockImages: string[];
}

const Board: React.FC<Props> = ({ recipes, mockImages }) => {
  return (
    <div className="board-container flex flex-row flex-wrap">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          image={mockImages[index % mockImages.length]}
        />
      ))}
    </div>
  );
};

export type { Recipe };
export default Board;
