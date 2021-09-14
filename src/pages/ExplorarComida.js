import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExplorarComida() {
  const history = useHistory();

  const getRandom = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((result) => result.json())
      .then((data) => history.push(`/comidas/${data.meals[0].idMeal}`));
  };

  return (
    <div>
      <Header lupa={ false } text="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandom }
      >
        Me Surpreenda!
      </button>
      <LowerMenu />
    </div>
  );
}
