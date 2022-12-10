import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
import './Itens.css';

export default class Itens extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { itens, addToCart } = this.props;
    return (
      <div>
        {
          (itens.length < 1) ? (
            <p>
              Nenhum resultado encontrado.
            </p>
          )
            : (
              itens.map((item) => (
                <div
                  key={ item.id }
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
                    onClick={ () => addToCart(item) }
                    data-testid="product-add-to-cart"
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
