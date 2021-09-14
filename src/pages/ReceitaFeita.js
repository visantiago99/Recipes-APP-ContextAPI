import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ReceitaFeita() {
  const [doneRecipe, setDoneRecipe] = useState();
  const [copyClip, setCopy] = useState(false);
  const [backup, setBackup] = useState();

  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  function getStorage(func1, func2) {
    if (localStorage.doneRecipes) {
      func1(doneRecipesStorage);
      func2(doneRecipesStorage);
    }
  }

  useEffect(() => {
    getStorage(setDoneRecipe, setBackup);
  }, []);

  function filtersFunc(type) {
    const foodFilter = backup.filter((value) => value.type === 'comida');
    const drinkFilter = backup.filter((value) => value.type === 'bebida');
    const allFilter = backup;
    switch (type) {
    case 'comida':
      return setDoneRecipe(foodFilter);
    case 'bebida':
      return setDoneRecipe(drinkFilter);
    case 'All':
      return setDoneRecipe(allFilter);
    default:
      setDoneRecipe(allFilter);
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
      <Header lupa={ false } text="Receitas Feitas" />
      {renderBtns()}
      {doneRecipe && doneRecipe.map((rec, index) => {
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
