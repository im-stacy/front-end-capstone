import React from 'react';
import Recipe from './Recipe'

type RecipeProps = {
    name: string;
    ingredients: string[];
};

type RecipeListProps = {
    recipes: RecipeProps[];
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div className='recipe-list'>
            {recipes.map((recipe: RecipeProps) => {
                return (
                    <Recipe
                        key={recipe.name}
                        name={recipe.name}
                        ingredients={recipe.ingredients}
                    />
                )
            })}
        </div>
    )
};
export default RecipeList;


