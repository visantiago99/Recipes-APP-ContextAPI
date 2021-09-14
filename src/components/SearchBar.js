import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchBar({ type }) {
  const {
    inputValue,
    setInputValue,
    filterFoodSearchHeader,
    filterDrinkSearchHeader,
  } = useContext(AppContext);

  return (
    <div>
      <input
        value={ inputValue.searchInput }
        onChange={ (e) => setInputValue({ ...inputValue, searchInput: e.target.value }) }
        data-testid="search-input"
        type="text"
        name="foodName"

      />
      <div>
        <form>
          <br />
          <label htmlFor="ingrediente-radio">
            Ingrediente
            <input
              name="search-ratio"
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingrediente-radio"
              value="ingrediente"
              onChange={ (e) => setInputValue({ ...inputValue,
                radioInput: e.target.value }) }
            />
          </label>

          <br />
          <label htmlFor="nome-radio">
            Nome
            <input
              name="search-ratio"
              type="radio"
              data-testid="name-search-radio"
              id="nome-radio"
              value="nome"
              onChange={ (e) => setInputValue({ ...inputValue,
                radioInput: e.target.value }) }
            />
          </label>

          <br />
          <label htmlFor="first-letter-radio">
            Primeira letra
            <input
              name="search-ratio"
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-letter-radio"
              value="first-letter"
              onChange={ (e) => setInputValue({ ...inputValue,
                radioInput: e.target.value }) }
            />
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => {
                if (type === 'food') filterFoodSearchHeader();
                if (type === 'drink') filterDrinkSearchHeader();
              } }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
