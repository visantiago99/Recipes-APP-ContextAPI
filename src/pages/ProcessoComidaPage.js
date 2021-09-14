import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function ProcessoComidaPage(props) {
  const [foodInProgress, setFoodIP] = useState();
  const [savedRecipe, setSavedRecipe] = useState();
  const history = useHistory();

  const marked = {
    textDecoration: 'line-through',
  };

  const unmarked = {
    textDecoration: 'none',
  };

  function localStorageState(func) {
    if (localStorage.inProgressRecipes) {
      const jsonObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      func(jsonObj);
    }
  }

  function fetchFood() {
    const { params } = props.match;
    const { id } = params;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((result) => setFoodIP(result));
  }

  function inProgressLocalStorage() {
    const { params } = props.match;
    const { id } = params;
    const inProgressObj = {
      cocktails: {},
      meals: {
        [id]: [],
      },
    };
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getStorage) {
      if (!getStorage.meals[id]) {
        inProgressObj.meals = { ...getStorage.meals, ...inProgressObj.meals };
        inProgressObj.cocktails = { ...getStorage.cocktails };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
      }
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    }
  }

  useEffect(() => {
    fetchFood();
    inProgressLocalStorage();
    localStorageState(setSavedRecipe);
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
  }, [savedRecipe]);

  const ingredientLimit = 15;
  const ingredientKeys = foodInProgress && (
    Object.keys(foodInProgress.meals[0]).filter((key) => key.includes('ngredient')));
  const measureKeys = foodInProgress && (
    Object.keys(foodInProgress.meals[0]).filter((key) => key.includes('easure')));
  const ingredientMap = ingredientKeys && ingredientKeys
    .filter((value) => foodInProgress.meals[0][value])
    .map(((ingre, index) => (
      `${foodInProgress.meals[0][ingre]}-${foodInProgress.meals[0][measureKeys[index]]}`)
    )).slice(0, ingredientLimit);
  const ingredientFilter = ingredientMap && ingredientMap
    .filter((value) => value !== 'null-null' && value !== '-');

  const { match } = props;
  const { params } = match;
  const { id } = params;

  function markIngredients({ target }) {
    const { checked } = target;
    if (checked) {
      target.parentNode.style.textDecoration = 'line-through';
      setSavedRecipe({
        ...savedRecipe,
        meals: { ...savedRecipe.meals, [id]: [...savedRecipe.meals[id], target.value] },
      });
    } else {
      target.parentNode.style.textDecoration = 'none';
      setSavedRecipe({
        ...savedRecipe,
        meals: { ...savedRecipe.meals,
          [id]: [...savedRecipe.meals[id].filter((value) => value !== target.value)] },
      });
    }
  }

  function mountDoneRecipes() {
    const ifDoneRecipesObj = [{
      id,
      type: 'comida',
      area: foodInProgress.meals[0].strArea,
      category: foodInProgress.meals[0].strCategory,
      alcoholicOrNot: '',
      name: foodInProgress.meals[0].strMeal,
      image: foodInProgress.meals[0].strMealThumb,
      doneDate: new Date().toLocaleDateString('PT-BR'),
      tags: [foodInProgress.meals[0].strTags],
    }];
    const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getDoneStorage) {
      localStorage.setItem('doneRecipes', JSON.stringify(ifDoneRecipesObj));
    } else {
      const elseDoneRecipesObj = [...getDoneStorage, {
        id,
        type: 'comida',
        area: foodInProgress.meals[0].strArea,
        category: foodInProgress.meals[0].strCategory,
        alcoholicOrNot: '',
        name: foodInProgress.meals[0].strMeal,
        image: foodInProgress.meals[0].strMealThumb,
        doneDate: new Date().toLocaleDateString('PT-BR'),
        tags: [foodInProgress.meals[0].strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(elseDoneRecipesObj));
    }
  }

  return (
    <div>
      <button type="button" onClick={ history.goBack }>Back</button>
      {foodInProgress && (
        <div>
          <img
            data-testid="recipe-photo"
            width="300"
            src={ foodInProgress.meals[0].strMealThumb }
            alt={ foodInProgress.meals[0].strMeal }
          />
          <h3 data-testid="recipe-title">{foodInProgress.meals[0].strMeal}</h3>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button type="button" data-testid="favorite-btn">favoritar</button>
          <p data-testid="recipe-category">{foodInProgress.meals[0].strCategory}</p>
          {ingredientFilter && ingredientFilter.map((ing, index) => (
            <label
              key={ index }
              htmlFor={ ing }
              data-testid={ `${index}-ingredient-step` }
              style={ savedRecipe.meals[id] && (
                savedRecipe.meals[id].includes(ing) ? marked : unmarked) }
            >
              {ing}
              <input
                onClick={ markIngredients }
                type="checkbox"
                name={ ing }
                key={ index }
                value={ ing }
                defaultChecked={ savedRecipe.meals[id] && (
                  savedRecipe.meals[id].includes(ing)) }
              />
            </label>))}
          <p data-testid="instructions">{foodInProgress.meals[0].strInstructions}</p>
          <Link to="/receitas-feitas">
            <button
              data-testid="finish-recipe-btn"
              onClick={ mountDoneRecipes }
              type="button"
              disabled={ savedRecipe.meals[id] && (
                savedRecipe.meals[id].length !== ingredientFilter.length) }
            >
              Finalizar receita
            </button>
          </Link>
        </div>)}
    </div>
  );
}

ProcessoComidaPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
