import React from 'react';

type RecipeProps = {
    name: string;
    ingredients: {[key:string]: number};
};

const Recipe: React.FC<RecipeProps> = ({ name, ingredients }) => {
    return (
       <div className='recipe'>
            <h3 className='recipe-name'>{name}</h3>
            <h4 className='recipe-ingredients'>Ingredients:</h4>
            <ul>
                {Object.entries(ingredients).map(([ingredient, amount]) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
       </div>
    )
}

export default Recipe;
