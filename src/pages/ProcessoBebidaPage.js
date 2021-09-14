import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function ProcessoBebidaPage(props) {
  const [drinkInProgress, setDrinkID] = useState();
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

  function fetchDrink() {
    const { params } = props.match;
    const { id } = params;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((result) => setDrinkID(result));
  }

  function inProgressLocalStorage() {
    const { params } = props.match;
    const { id } = params;
    const inProgressObj = {
      cocktails: {
        [id]: [],
      },
      meals: {},
    };
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getStorage) {
      if (!getStorage.cocktails[id]) {
        inProgressObj.cocktails = { ...getStorage.cocktails, ...inProgressObj.cocktails };
        inProgressObj.meals = { ...getStorage.meals };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
      }
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressObj));
    }
  }

  useEffect(() => {
    fetchDrink();
    inProgressLocalStorage();
    localStorageState(setSavedRecipe);
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedRecipe));
  }, [savedRecipe]);

  const ingredientLimit = 15;
  const ingredientKeys = drinkInProgress && (
    Object.keys(drinkInProgress.drinks[0]).filter((key) => key.includes('ngredient')));
  const measureKeys = drinkInProgress && (
    Object.keys(drinkInProgress.drinks[0]).filter((key) => key.includes('easure')));
  const ingredientMap = ingredientKeys && ingredientKeys
    .filter((value) => drinkInProgress.drinks[0][value])
    .map(((ingre, index) => (
      `${drinkInProgress.drinks[0][ingre]}-${drinkInProgress.drinks[0][measureKeys[index]]
      }`)
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
        cocktails: { ...savedRecipe.cocktails,
          [id]: [...savedRecipe.cocktails[id], target.value] },
      });
    } else {
      target.parentNode.style.textDecoration = 'none';
      setSavedRecipe({
        ...savedRecipe,
        cocktails: { ...savedRecipe.cocktails,
          [id]: [...savedRecipe.cocktails[id]
            .filter((value) => value !== target.value)] },
      });
    }
  }

  function mountDoneRecipes() {
    const ifDoneRecipesObj = [{
      id,
      type: 'bebida',
      area: '',
      category: drinkInProgress.drinks[0].strCategory,
      alcoholicOrNot: drinkInProgress.drinks[0].strAlcoholic,
      name: drinkInProgress.drinks[0].strDrink,
      image: drinkInProgress.drinks[0].strDrinkThumb,
      doneDate: new Date().toLocaleDateString('PT-BR'),
      tags: [drinkInProgress.drinks[0].strTags],
    }];
    const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getDoneStorage) {
      localStorage.setItem('doneRecipes', JSON.stringify(ifDoneRecipesObj));
    } else {
      const elseDoneRecipesObj = [...getDoneStorage, {
        id,
        type: 'bebida',
        area: '',
        category: drinkInProgress.drinks[0].strCategory,
        alcoholicOrNot: drinkInProgress.drinks[0].strAlcoholic,
        name: drinkInProgress.drinks[0].strDrink,
        image: drinkInProgress.drinks[0].strDrinkThumb,
        doneDate: new Date().toLocaleDateString('PT-BR'),
        tags: [drinkInProgress.drinks[0].strTags],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(elseDoneRecipesObj));
    }
  }

  return (
    <div>
      <button type="button" onClick={ history.goBack }>Back</button>
      {drinkInProgress && (
        <div>
          <img
            data-testid="recipe-photo"
            width="300"
            src={ drinkInProgress.drinks[0].strDrinkThumb }
            alt={ drinkInProgress.drinks[0].strDrink }
          />
          <h3 data-testid="recipe-title">{drinkInProgress.drinks[0].strDrink}</h3>
          <button type="button" data-testid="share-btn">compartilhar</button>
          <button type="button" data-testid="favorite-btn">favoritar</button>
          <p data-testid="recipe-category">{drinkInProgress.drinks[0].strCategory}</p>
          {ingredientFilter && ingredientFilter.map((ing, index) => (
            <label
              key={ index }
              htmlFor={ ing }
              data-testid={ `${index}-ingredient-step` }
              style={ savedRecipe && (
                savedRecipe.cocktails[id].includes(ing) ? marked : unmarked) }
            >
              {ing}
              <input
                onClick={ markIngredients }
                type="checkbox"
                name={ ing }
                key={ index }
                value={ ing }
                defaultChecked={ savedRecipe && savedRecipe.cocktails[id].includes(ing) }
              />
            </label>))}
          <p data-testid="instructions">{drinkInProgress.drinks[0].strInstructions}</p>
          <Link to="/receitas-feitas">
            <button
              data-testid="finish-recipe-btn"
              onClick={ mountDoneRecipes }
              type="button"
              disabled={ savedRecipe && (
                savedRecipe.cocktails[id].length !== ingredientFilter.length) }
            >
              Finalizar receita
            </button>
          </Link>
        </div>)}
    </div>
  );
}

ProcessoBebidaPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
