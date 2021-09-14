import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

function favObj(typeObj, state) {
  const localObj = {
    id: typeObj === 'meals' ? state.idMeal : state.idDrink,
    type: typeObj === 'meals' ? 'comida' : 'bebida',
    area: typeObj === 'meals' ? state.strArea : '',
    category: state.strCategory,
    alcoholicOrNot: typeObj === 'meals' ? '' : state.strAlcoholic,
    name: typeObj === 'meals' ? state.strMeal : state.strDrink,
    image: typeObj === 'meals' ? state.strMealThumb : state.strDrinkThumb,
  };
  return localObj;
}

export default function ShareFavBtn({ type, id, typeRecipe, data }) {
  const [forceUpdate, setForceUpdate] = useState(false);
  const { setAlert } = useContext(AppContext);

  function shareFood() {
    switch (type) {
    case 'comida':
      copy(`http://localhost:3000/comidas/${id}`);
      return setAlert(true);
    case 'bebida':
      copy(`http://localhost:3000/bebidas/${id}`);
      return setAlert(true);
    default:
      alert('Link não copiado');
    }
  }

  function addToFavorite() {
    const callFunc = favObj(typeRecipe, data);
    if (localStorage.favoriteRecipes) {
      const storage = JSON.parse(localStorage.favoriteRecipes);
      const newArray = [...storage, callFunc];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setForceUpdate(!forceUpdate);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([callFunc]));
      setForceUpdate(!forceUpdate);
    }
  }

  function removeFavorite() {
    const filterFav = JSON.parse(localStorage.favoriteRecipes);
    const resultFilter = filterFav.filter((value) => value.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(resultFilter));
    setForceUpdate(!forceUpdate);
  }

  if (!localStorage.favoriteRecipes || !(JSON.parse(localStorage.favoriteRecipes))
    .find((value) => value.id === id)) {
    return (
      <div>
        <button type="button" onClick={ shareFood } data-testid="share-btn">
          <img src={ shareIcon } alt="shareBtn" />
        </button>
        <button type="button" onClick={ addToFavorite }>
          <img
            src={ whiteHeartIcon }
            alt="favBtn"
            data-testid="favorite-btn"
          />
        </button>
      </div>
    );
  } return (
    <div>
      <button type="button" onClick={ shareFood } data-testid="share-btn">
        <img src={ shareIcon } alt="shareBtn" />
      </button>
      <button type="button" onClick={ removeFavorite }>
        <img
          src={ blackHeartIcon }
          alt="favBtn"
          data-testid="favorite-btn"
        />
      </button>
    </div>);
}

ShareFavBtn.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  typeRecipe: PropTypes.string.isRequired,
};
