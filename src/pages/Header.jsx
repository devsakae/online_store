import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teste from 'prop-types';

export default class Header extends Component {
  render() {
    const { searchInput, searchValue, searchButton } = this.props;
    return (
      <header>
        <div>
          <input
            name="query-input"
            onChange={ searchInput }
            value={ searchValue }
          />
          <button
            type="button"
            onClick={ searchButton }
          >
            Pesquisar
          </button>
        </div>
        <Link to="/">
          <h1 className="loja">Banca 37</h1>
        </Link>
        <Link to="/carrinho">
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
