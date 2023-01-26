import React from 'react';

type RecipeProps = {
    name: string;
    ingredients: string[];
};

const Recipe: React.FC<RecipeProps> = ({ name, ingredients }) => {
    return (
       <div className='recipe'>
            <h3 className='recipe-name'>{name}</h3>
            <h4 className='recipe-ingredients'>Ingredients:</h4>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
       </div>
    )
}

export default Recipe;
