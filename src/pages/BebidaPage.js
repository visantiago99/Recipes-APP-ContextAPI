import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';
import LowerMenu from '../components/LowerMenu';
import SearchCategories from '../components/SearchCategories';
import DrinkCard from '../components/DrinkCard';

export default function BebidaPage() {
  const {
    showInput,
    data,
    setDrinkCategories,
    drinkCategories,
  } = useContext(AppContext);

  const fetchCategories = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json())
      .then((rdata) => setDrinkCategories(rdata));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderData = () => {
    const RENDER_CONDITION = 11;

    return (
      data.drinks && (
        <div>
          {data.drinks.map((drink, index) => index <= RENDER_CONDITION && (
            <DrinkCard key={ index } drink={ drink } index={ index } />
          ))}
        </div>
      )
    );
  };

  return (
    <div>
      <Header text="Bebidas" lupa />
      {showInput && <SearchBar type="drink" />}
      { drinkCategories ? <SearchCategories type="drink" /> : <p>Loading...</p> }
      { data ? renderData() : <p>faca uma pesquisa</p> }
      <LowerMenu />
    </div>
  );
}
