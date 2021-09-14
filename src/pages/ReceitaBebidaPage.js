import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import ShareFavBtn from '../components/ShareFavBtn';
import { ingredientDrinkHelper } from '../components/Helper';
import '../style/pageDetails.css';
import AppContext from '../context/AppContext';

export default function ReceitaBebidaPage() {
  const [drinkDetails, setDrinkDetails] = useState();
  const [recomendations, setRecomendations] = useState();
  const [storageInPrgrss, setStorageIn] = useState();
  const { alertSpan, setAlert } = useContext(AppContext);
  const [storageFavorite, setStorageFav] = useState();
  const location = useLocation();
  const DRINK_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const RECOMENDATIONS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const history = useHistory();

  useEffect(() => {
    const foodId = location.pathname.split('/')[2];
    fetch(DRINK_DETAILS_URL + foodId)
      .then((response) => response.json())
      .then((data) => setDrinkDetails(data));
  }, []);

  function getInProgress() {
    const getInPrgssStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setStorageIn(getInPrgssStorage);
  }

  function getFavoriteStorage() {
    const getFavStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setStorageFav(getFavStorage);
  }

  useEffect(() => {
    getInProgress();
    getFavoriteStorage();
    fetch(RECOMENDATIONS_URL)
      .then((response) => response.json())
      .then((data) => setRecomendations(data));
  }, []);

  function renderRecomendation() {
    const maxLength = 6;
    return (
      recomendations.meals.map((recipe, index) => {
        if (index < maxLength) {
          return (
            <div
              key={ recipe.strMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                height="180px"
                width="180px"
                data-testid="recipe-photo"
              />
              <h5 data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</h5>
            </div>
          );
        }
        return null;
      })
    );
  }

  useEffect(() => {
    setAlert(false);
  }, []);

  const ingredientFilter = ingredientDrinkHelper(drinkDetails);

  function renderDrinks() {
    return (
      <div>
        <ShareFavBtn
          type="bebida"
          id={ drinkDetails.drinks[0].idDrink }
          favorited={ storageFavorite }
          typeRecipe="drinks"
          data={ drinkDetails.drinks[0] }
        />
        {alertSpan ? <span>Link copiado!</span> : ''}
        <p>{ drinkDetails.idDrink }</p>
        <img
          src={ drinkDetails.drinks[0].strDrinkThumb }
          alt="foto"
          data-testid="recipe-photo"
          width="200px"
        />
        <h1 data-testid="recipe-title">{ drinkDetails.drinks[0].strDrink }</h1>
        <h5 data-testid="recipe-category">{ drinkDetails.drinks[0].strCategory }</h5>
        <p data-testid="recipe-category">{ drinkDetails.drinks[0].strAlcoholic }</p>

        <div>
          <h3>Ingredients</h3>
          <ul>
            { ingredientFilter ? ingredientFilter.map((item, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { item }
              </p>)) : '' }
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <p data-testid="instructions">
            { drinkDetails.drinks[0].strInstructions }
          </p>
        </div>
        <Link to={ `/bebidas/${drinkDetails.drinks[0].idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed',
              bottom: '0px' } }
          >
            {storageInPrgrss && (
              storageInPrgrss.cocktails[drinkDetails.drinks[0].idDrink]) ? (
                'Continuar Receita') : 'Iniciar Receita'}
          </button>
        </Link>
        <div>
          <h3>Receitas recomendadas</h3>
          <div className="scrolling-wrapper">
            { recomendations ? renderRecomendation() : <p>Loading...</p> }
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button type="button" onClick={ history.goBack }>Back</button>
      { drinkDetails ? renderDrinks() : <p>Loading...</p> }
    </div>
  );
}

ReceitaBebidaPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
