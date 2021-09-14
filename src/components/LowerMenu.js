import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../style/LowerMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LowerMenu() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" alt="Drink" src={ drinkIcon } />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" alt="Explorer" src={ exploreIcon } />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" alt="Food" src={ mealIcon } />
      </Link>
    </footer>
  );
}

export default LowerMenu;
