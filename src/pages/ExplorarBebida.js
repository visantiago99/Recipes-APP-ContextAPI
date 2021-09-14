import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExplorarBebida() {
  const history = useHistory();

  const getRandom = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((result) => result.json())
      .then((data) => history.push(`/bebidas/${data.drinks[0].idDrink}`));
  };

  return (
    <div>
      <Header lupa={ false } text="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
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
