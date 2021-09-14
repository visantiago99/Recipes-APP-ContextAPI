import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import ShareFavBtn from '../components/ShareFavBtn';
import { ingredientFoodHelper } from '../components/Helper';
import '../style/pageDetails.css';
import AppContext from '../context/AppContext';

export default function ReceitaComidaPage() {
  const [foodDetails, setFoodDetails] = useState();
  const [recomendations, setRecomendations] = useState();
  const [storageInPrgrss, setStorageIn] = useState();
  const { alertSpan, setAlert } = useContext(AppContext);
  const [storageFavorite, setStorageFav] = useState();
  const location = useLocation();
  const FOOD_DETAILS_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const RECOMENDATIONS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const history = useHistory();

  useEffect(() => {
    const foodId = location.pathname.split('/')[2];
    fetch(FOOD_DETAILS_URL + foodId)
      .then((response) => response.json())
      .then((data) => setFoodDetails(data));
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
      recomendations.drinks.map((recipe, index) => {
        if (index < maxLength) {
          return (
            <div
              key={ recipe.strDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                height="200px"
                width="200px"
                data-testid="recipe-photo"
              />
              <p data-testid={ `${index}-recomendation-title` }>{ recipe.strDrink }</p>
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

  const ingredientFilter = ingredientFoodHelper(foodDetails);

  function renderFoods() {
    return (
      <div>
        <ShareFavBtn
          type="comida"
          id={ foodDetails.meals[0].idMeal }
          favorited={ storageFavorite }
          typeRecipe="meals"
          data={ foodDetails.meals[0] }
        />
        {alertSpan ? <span>Link copiado!</span> : ''}
        <p>{foodDetails ? foodDetails.idMeal : ''}</p>
        <img
          src={ foodDetails.meals[0].strMealThumb }
          alt="Foto"
          data-testid="recipe-photo"
          width="200px"
        />
        <h1 data-testid="recipe-title">{ foodDetails.meals[0].strMeal }</h1>
        <h5 data-testid="recipe-category">{ foodDetails.meals[0].strCategory }</h5>

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
            { foodDetails.meals[0].strInstructions }
          </p>
        </div>
        <Link to={ `/comidas/${foodDetails.meals[0].idMeal}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed',
              bottom: '0px',
              left: '0px' } }
          >
            {storageInPrgrss && storageInPrgrss.meals[foodDetails.meals[0].idMeal] ? (
              'Continuar Receita') : 'Iniciar Receita'}
          </button>
        </Link>
        <object
          src={ foodDetails.meals[0].strYoutube }
          data-testid="video"
          aria-label="meal-video"
          width="400"
          height="300"
        />
        <h3>Receitas recomendadas</h3>
        <div className="scrolling-wrapper">
          { recomendations ? renderRecomendation() : <p>Loading...</p> }
        </div>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={ history.goBack }>Back</button>
      { foodDetails ? renderFoods() : <p>Loading...</p> }
    </div>
  );
}

ReceitaComidaPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
