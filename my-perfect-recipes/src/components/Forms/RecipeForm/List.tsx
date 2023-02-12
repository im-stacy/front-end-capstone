import React, { useState } from 'react';
import { Ingredient } from './RecipeForm';
import { IngredientsList } from '../../shared/styled-components';

interface ListItemProps {
  ingredient: Ingredient;
  onRemove: (name: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ ingredient, onRemove }) => {
  return (
    <li>
      {ingredient.name} - {ingredient.amount}
      <button onClick={() => onRemove(ingredient.name)}>X</button>
    </li>
  );
};

const List: React.FC<{ ingredients: Ingredient[]}> = ({ ingredients }) => {
  const [listItems, setListItems] = useState(ingredients);

  const handleRemove = (name: string) => {
    setListItems(listItems.filter(ingredient => ingredient.name !== name));
  };

  return (
    <IngredientsList>
        {listItems.map((item, index) => (
          <ListItem key={item.name} ingredient={item} onRemove={handleRemove} />
        ))}
    </IngredientsList>
    
  );
};

export default List;
