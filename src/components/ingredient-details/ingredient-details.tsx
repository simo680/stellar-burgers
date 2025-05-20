import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsRequest
} from '../../services/selectors/ingredientSelector';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const id = params.id;

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsRequest);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData || isLoading) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
