import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function ReceitaFavoritas() {
  const [favoriteRecipe, setFavoriteRecipe] = useState();
  const [backup, setBackup] = useState();
  const [copyClip, setCopy] = useState(false);
  // const mockFavoriteStorage = [
  //   {
  //     id: '52771',
  //     type: 'comida',
  //     area: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'bebida',
  //     area: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipe(data);
    setBackup(data);
  }, []);

  function unfavorite(idValue) {
    const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtered = favoritesStorage.filter((value) => value.id !== idValue);
    setFavoriteRecipe(filtered);
    setBackup(filtered);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
  }

  function filtersFunc(type) {
    const foodFilter = backup.filter((value) => value.type === 'comida');
    const drinkFilter = backup.filter((value) => value.type === 'bebida');
    const allFilter = backup;
    switch (type) {
    case 'comida':
      return setFavoriteRecipe(foodFilter);
    case 'bebida':
      return setFavoriteRecipe(drinkFilter);
    case 'All':
      return setFavoriteRecipe(allFilter);
    default:
      setFavoriteRecipe(allFilter);
    }
  }

  function renderBtns() {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ (e) => filtersFunc(e.target.value) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
          onClick={ (e) => filtersFunc(e.target.value) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
          onClick={ (e) => filtersFunc(e.target.value) }
        >
          Drinks
        </button>
      </div>);
  }

  function shareFood(param) {
    copy(`http://localhost:3000/comidas/${param}`);
    setCopy(true);
    alert('Link copiado!');
  }

  function shareDrink(param) {
    copy(`http://localhost:3000/bebidas/${param}`);
    setCopy(true);
    alert('Link copiado!');
  }

  return (
    <div>
      <Header lupa={ false } text="Receitas Favoritas" />
      {renderBtns()}
      {favoriteRecipe && favoriteRecipe.map((rec, index) => {
        if (rec.type === 'comida') {
          return (
            <div key={ index }>
              <Link to={ `/comidas/${rec.id}` }>
                <img
                  src={ rec.image }
                  alt={ rec.name }
                  data-testid={ `${index}-horizontal-image` }
                  width="100px"
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${rec.area} - ${rec.category}`}
              </p>
              <Link to={ `/comidas/${rec.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{rec.name}</h3>
              </Link>
              <h4 data-testid={ `${index}-horizontal-done-date` }>{rec.doneDate}</h4>
              <button type="button" onClick={ () => shareFood(rec.id) }>
                <img
                  src={ shareIcon }
                  alt="btnShare"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button type="button" onClick={ () => unfavorite(rec.id) }>
                <img
                  src={ blackHeartIcon }
                  alt="favShare"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
              {copyClip ? <span>Link copiado!</span> : null}
              {rec.tags ? rec.tags.map((tag, indexTag) => (
                <span key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>)) : null}
            </div>
          );
        }
        return (
          <div key={ index }>
            <Link to={ `/bebidas/${rec.id}` }>
              <img
                src={ rec.image }
                alt={ rec.name }
                data-testid={ `${index}-horizontal-image` }
                width="100px"
              />
            </Link>
            <h4 data-testid={ `${index}-horizontal-top-text` }>{rec.category}</h4>
            { rec.alcoholicOrNot !== '' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>{rec.alcoholicOrNot}</p>
            ) : null }
            <Link to={ `/bebidas/${rec.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{rec.name}</h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>{rec.doneDate}</h4>
            <button type="button" onClick={ () => shareDrink(rec.id) }>
              <img
                src={ shareIcon }
                alt="btnShare"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button type="button" onClick={ () => unfavorite(rec.id) }>
              <img
                src={ blackHeartIcon }
                alt="favShare"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            {rec.tags ? rec.tags.map((tag, indexTag) => (
              <span key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>)) : null}
          </div>
        );
      })}
    </div>
  );
}
