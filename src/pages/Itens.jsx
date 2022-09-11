import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
import './Itens.css';

export default class Itens extends React.Component {
  render() {
    const { itens, addToCart } = this.props;
    return (
      <div className="main">
        {
          itens.length < 1 ? (<p>Nenhum produto foi encontrado</p>)
            : (
              itens.map((item) => (
                <div
                  key={ item.id }
                  data-testid="product"
                  className="item"
                >
                  <img src={ item.thumbnail } alt={ item.title } />
                  <h4>{ item.title }</h4>
                  <p>
                    <Link
                      to={ `/productdetails/${item.id}` }
                      key={ item.id }
                      data-testid="product-detail-link"
                    >
                      Mais detalhes do produto
                    </Link>
                  </p>
                  <p>
                    { `Valor: R$ ${item.price}` }
                  </p>
                  <button
                    type="button"
                    onClick={ () => addToCart(item.id) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              )))
        }
      </div>
    );
  }
}

Itens.propTypes = {
  itens: teste.object,
}.isRequired;
