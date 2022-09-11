import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import teste from 'prop-types';
import Header from './Header';

export default class Carrinho extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { searchInput, searchValue, searchButton, categorias } = this.props;
    return (
      <div>
        <Header
          searchInput={ searchInput }
          searchValue={ searchValue }
          searchButton={ searchButton }
        />
        <div className="container-row">
          { !loading
          && (
            <ul className="categorias">
              {
                categorias.map((categoria) => (
                  <Link to={ `/${categoria.id}` } key={ categoria.id }>
                    <li
                      data-testid="category"
                      key={ categoria.id }
                    >
                      { categoria.name }
                    </li>
                  </Link>
                ))
              }
            </ul>
          )}
          <div className="container-col">
            <h3>Carrinho de Compras</h3>
            <div data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Carrinho.propTypes = {
  searchButton: teste.func,
  searchInput: teste.func,
  searchValue: teste.string,
}.isRequired;
