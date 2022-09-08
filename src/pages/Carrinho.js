import React, { Component } from 'react';

export default class Carrinho extends Component {
  render() {
    return (
      <div>
        <h1>Carrinho de Compras</h1>
        <div data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </div>
      </div>
    );
  }
}
