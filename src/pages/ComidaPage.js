import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';
import LowerMenu from '../components/LowerMenu';
import SearchCategories from '../components/SearchCategories';
import FoodCard from '../components/FoodCard';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function ComidaPage() {
  const {
    showInput,
    data,
    setFoodCategories,
    foodCategories,
  } = useContext(AppContext);

  const fetchCategories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json())
      .then((rdata) => setFoodCategories(rdata));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderData = () => {
    const RENDER_CONDITION = 11;

    return (
      data.meals && (
        <div>
          {data.meals.map((meal, index) => index <= RENDER_CONDITION && (
            <FoodCard key={ index } index={ index } meal={ meal } />
          ))}
        </div>
      )
    );
  };

  return (
    <div>
      <Header text="Comidas" lupa />
      { showInput && <SearchBar type="food" /> }
      { foodCategories ? <SearchCategories type="food" /> : <p>Loading...</p> }
      { data ? renderData() : <p>faca uma pesquisa</p> }
      <LowerMenu />
    </div>
  );
}
