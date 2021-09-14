import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExplorarComidaIngredientes() {
  return (
    <div>
      <Header lupa={ false } text="Explorar Ingredientes" />
      <LowerMenu />
    </div>
  );
}
