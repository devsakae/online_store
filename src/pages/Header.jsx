import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teste from 'prop-types';
import './Header.css';

export default class Header extends Component {
  render() {
    const { searchInput, searchValue, searchButton } = this.props;
    return (
      <header>
        <div>
          <input
            data-testid="query-input"
            name="query-input"
            onChange={ searchInput }
            value={ searchValue }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ searchButton }
          >
            Pesquisar
          </button>
        </div>
        <Link to="/">
          <div className="loja"><h1>Banca 37</h1></div>
        </Link>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          🛒 Carrinho de compras
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  searchButton: teste.func,
  searchInput: teste.func,
  searchValue: teste.string,
}.isRequired;
