import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [validate, setValidate] = useState({ validate: false });
  const passwordLimit = 6;

  const validateInputs = () => {
    const regex = /.+@.+\.[A-Za-z]+$/.test(loginInput.email);
    if (regex && loginInput.password.length > passwordLimit) {
      setValidate({ validate: true });
    }
  };

  useEffect(() => {
    validateInputs();
  }, [loginInput.password]);

  const createLocalstorage = () => {
    const userObj = { email: loginInput.email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  return (
    <div className="login-container">
      <span className="logo">RECIPE APP</span>
      <br />
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <br />
      <label htmlFor="email">
        Email:
        <br />
        <input
          type="email"
          name="email"
          placeholder="insert your email"
          data-testid="email-input"
          onChange={ (e) => setLoginInput({
            ...loginInput,
            email: e.target.value,
          }) }
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <br />
        <input
          type="password"
          name="password"
          placeholder="insert your password"
          data-testid="password-input"
          onChange={ (e) => setLoginInput({
            ...loginInput,
            password: e.target.value,
          }) }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validate.validate }
          onClick={ () => createLocalstorage() }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
