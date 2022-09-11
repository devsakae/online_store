import React, { Component } from 'react';
import teste from 'prop-types';
import { getLocal } from '../services/localhost';

export default class Carrinho extends Component {
  state = {
    myCartHere: [],
  };

  componentDidMount() {
    const myCartHere = getLocal();
    this.setState({
      myCartHere,
    });
  }

  render() {
    const { myCartHere } = this.state;
    return (
      <div className="container-col">
        <h3>Carrinho de Compras</h3>
        { !myCartHere
          ? (
            <div data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </div>
          )
          : (
            <div>
              { myCartHere.map((item) => (
                <div key={ item.id }>
                  <p data-testid="shopping-cart-product-name">
                    { item.title }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    { myCartHere.filter((compara) => compara.id === item.id).length }
                  </p>
                </div>
              )) }
            </div>
          )}
      </div>
    );
  }
}

Carrinho.propTypes = {
  searchButton: teste.func,
  searchInput: teste.func,
  searchValue: teste.string,
}.isRequired;
