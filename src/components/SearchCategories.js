import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

function SearchCategories({ type }) {
  const {
    foodCategories,
    drinkCategories,
    setData,
    switchFilter,
    filter,
  } = useContext(AppContext);

  const useData = type === 'food' ? foodCategories.meals : drinkCategories.drinks;
  const CATEGORY_NUMER = 5;

  const searchByCategory = (category) => {
    switch (type) {
    case 'food':
      if (category === 'All') {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((result) => result.json())
          .then((rdata) => setData(rdata));
        return;
      }
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((rdata) => setData(rdata));
      break;

    case 'drink':
      if (category === 'All') {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((result) => result.json())
          .then((rdata) => setData(rdata));
        return;
      }
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((rdata) => setData(rdata));
      break;

    default:
      break;
    }
  };

  useEffect(() => { searchByCategory(filter); }, [filter]);

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={ ({ target }) => switchFilter(target.value) }
      >
        All
      </button>
      {useData.map((category, index) => (
        index < CATEGORY_NUMER && (
          <button
            value={ category.strCategory }
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ ({ target }) => {
              switchFilter(target.value);
            } }
          >
            {category.strCategory}
          </button>)
      ))}
    </div>
  );
}

SearchCategories.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchCategories;
