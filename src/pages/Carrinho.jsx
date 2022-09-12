import React, { Component } from 'react';
import teste from 'prop-types';
import { getLocal } from '../services/localhost';
import './ProductDetails.css';

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
            <div className="enclausura">
              <div className="details">
                <div className="nome">Nome</div>
                <div className="oresto">
                  <div>Qtd</div>
                  <div>Preço</div>
                </div>
              </div>
              { myCartHere.map((item) => (
                <div
                  key={ item.id }
                  className="details"
                >
                  <div data-testid="shopping-cart-product-name" className="nome">
                    { item.title }
                  </div>
                  <div className="oresto">
                    <div data-testid="shopping-cart-product-quantity">
                      { myCartHere.filter((compara) => compara.id === item.id).length }
                    </div>
                    <div data-testid="shopping-cart-product-price">
                      { (item.price)
                        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                    </div>
                  </div>
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
