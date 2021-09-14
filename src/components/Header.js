import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from '../context/AppContext';

export default function Header({ text, lupa }) {
  const {
    showInput,
    setShowInput } = useContext(AppContext);

  const showSearchBar = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profileIcon" />
      </Link>
      <Link to="/comidas" style={ { color: 'black', fontSize: '29px' } }>
        <AiOutlineHome />
      </Link>
      <h3 data-testid="page-title">{text}</h3>
      {lupa
      && (
        <button
          type="button"
          onClick={ () => showSearchBar() }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
        </button>)}
    </div>
  );
}

Header.propTypes = {
  lupa: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
