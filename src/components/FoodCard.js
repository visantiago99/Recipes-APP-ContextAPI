import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodCard({ meal, index }) {
  return (
    <Link to={ `comidas/${meal.idMeal}` }>
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          width="80%"
          data-testid={ `${index}-card-img` }
          alt={ meal.strMeal }
          src={ meal.strMealThumb }
        />
        <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodCard;
