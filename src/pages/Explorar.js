import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import LowerMenu from '../components/LowerMenu';

export default function Explorar() {
  return (
    <div>
      <Header text="Explorar" lupa={ false } />
      <div>
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <LowerMenu />
    </div>
  );
}
