import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  return (
    <Link to={ `bebidas/${drink.idDrink}` }>
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          width="80%"
          data-testid={ `${index}-card-img` }
          alt={ drink.strDrink }
          src={ drink.strDrinkThumb }
        />
        <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
      </div>
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
