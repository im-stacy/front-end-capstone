import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

const RecipeName = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  width: 50%;
`;

const IngredientContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 10px 0;
`;

const IngredientName = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  flex: 1;
`;

const IngredientQuantity = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  flex: 1;
`;

const CookingNotes = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  flex: 1;
`;
const AddIngredientButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  background-color: green;
  color: #fff;
  cursor: pointer;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  width: 50%;
`;

const SubmitRecipeButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  background-color: blue;
  color: #fff;
  cursor: pointer;
`;

export {
  FormContainer,
  RecipeName,
  IngredientContainer,
  IngredientName,
  IngredientQuantity,
  CookingNotes,
  AddIngredientButton,
  IngredientsList,
  SubmitRecipeButton,
};
