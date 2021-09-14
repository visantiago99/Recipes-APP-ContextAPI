import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './AppContext';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState();
  const [foodCategories, setFoodCategories] = useState();
  const [alertSpan, setAlert] = useState(false);
  const [drinkCategories, setDrinkCategories] = useState();
  const [filter, setFilter] = useState('All');
  const history = useHistory();
  const [inputValue, setInputValue] = useState({
    searchInput: '',
    radioInput: '',
  });

  const switchFilter = (filterValue) => {
    if (filter === filterValue) return setFilter('All');
    setFilter(filterValue);
  };

  const foodVerification = (vdata) => {
    if (vdata.meals !== null) {
      if (vdata.meals.length > 1) return setData(vdata);
      if (vdata.meals.length <= 1) {
        return history.push(`/comidas/${vdata.meals[0].idMeal}`);
      }
    }
    if (vdata.meals === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const drinkVerification = (vdata) => {
    if (vdata.drinks !== null) {
      if (vdata.drinks.length > 1) return setData(vdata);
      if (vdata.drinks.length <= 1) {
        return history.push(`/bebidas/${vdata.drinks[0].idDrink}`);
      }
    }
    if (vdata.drinks === null) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const fetchSearchHeader = (URL) => {
    fetch(URL)
      .then((response) => response.json())
      .then((dataValue) => {
        const value = Object.keys(dataValue).toString();
        switch (value) {
        case 'meals':
          foodVerification(dataValue);
          break;

        case 'drinks':
          drinkVerification(dataValue);
          break;

        default:
          break;
        }
      });
  };

  const filterFoodSearchHeader = () => {
    switch (inputValue.radioInput) {
    case 'ingrediente':
      fetchSearchHeader(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue.searchInput}`);
      break;
    case 'nome':
      fetchSearchHeader(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue.searchInput}`);
      break;
    case 'first-letter':
      if (inputValue.searchInput.length !== 1) {
        setInputValue({ ...inputValue, searchInput: '' });
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        fetchSearchHeader(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue.searchInput}`);
      }
      break;
    default:
      // eslint-disable-next-line no-alert
      alert('Nenhum filtro foi selecionado!');
    }
  };

  const filterDrinkSearchHeader = () => {
    switch (inputValue.radioInput) {
    case 'ingrediente':
      fetchSearchHeader(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue.searchInput}`);
      break;
    case 'nome':
      fetchSearchHeader(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue.searchInput}`);
      break;
    case 'first-letter':
      if (inputValue.searchInput.length !== 1) {
        setInputValue({ ...inputValue, searchInput: '' });
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        fetchSearchHeader(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue.searchInput}`);
      }
      break;
    default:
      // eslint-disable-next-line no-alert
      alert('Nenhum filtro foi selecionado!');
    }
  };

  const context = {
    showInput,
    setShowInput,
    inputValue,
    setInputValue,
    filterFoodSearchHeader,
    filterDrinkSearchHeader,
    data,
    setData,
    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
    filter,
    switchFilter,
    alertSpan,
    setAlert,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
