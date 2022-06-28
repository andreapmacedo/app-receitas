import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function IngredientsRecipeFoodInProgress({ recipe }) {
  const { id } = useParams();
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const [inProgressRecipe, setInProgressRecipe] = useState(
    local?.meals?.[id] || [],
  );

  function recipeInProgress() {
    if (local) {
      // const objs = Object.values(local);
      console.log(local.meals[id]);
      // const recipeList = objs.reduce((acc, curr) => {
      //   acc.meals = { ...curr, [id]: inProgressRecipe };
      //   return acc;
      // }, { meals: '' });
      const test = { ...local, meals: { ...local.meals, [id]: inProgressRecipe } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(test));
    } else {
      const recipeList = { meals: { [id]: inProgressRecipe } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeList));
    }
  }

  function listProgressChange({ target }) {
    if (target.checked) {
      setInProgressRecipe([...inProgressRecipe, target.name]);
    } else {
      setInProgressRecipe(inProgressRecipe.filter((recipeI) => recipeI !== target.name));
    }
  }

  function isChecked(name) {
    let result = false;
    inProgressRecipe.forEach((iten) => {
      if (iten === name) {
        result = true;
      }
    });
    return result;
  }

  function filterIngredientsAndMeasures(recipeIten, str) {
    const result = Object.entries(recipeIten)
      .map(([key, value]) => {
        if (key.includes(str)) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null && arr !== ' ');
    return result;
  }
  const ingredients = filterIngredientsAndMeasures(recipe, 'strIngredient');
  const measure = filterIngredientsAndMeasures(recipe, 'strMeasure');

  useEffect(() => {
    recipeInProgress();
  }, [inProgressRecipe]);

  return (ingredients.map((item, index) => (
    <div key={ index }>
      <label data-testid={ `${index}-ingredient-step` } htmlFor={ index }>
        <input
          type="checkbox"
          name={ item }
          onChange={ listProgressChange }
          checked={ isChecked(item) }
        />
        { measure[index]
          ? `${ingredients[index]} - ${measure[index]}`
          : `${ingredients[index]}`}
      </label>
    </div>))
  );
}

IngredientsRecipeFoodInProgress.prototypes = {
  recipe: PropTypes.string,
}.isRequired;

export default IngredientsRecipeFoodInProgress;
