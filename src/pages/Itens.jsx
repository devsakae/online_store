import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
import './Itens.css';
import ItemCard from '../components/ItemCard';

const MAX_CHAR_TITLE = 25;

export default class Itens extends React.Component {
  render() {
    const { itens, addToCart } = this.props;
    return (
      <>
        {
          itens.map((item) => (
            <ItemCard key={ item.id }>
              <h2>{ `${item.title.toUpperCase().substring(0, MAX_CHAR_TITLE)}...` }</h2>
              <img src={ item.thumbnail } alt={ item.title } />
              { `Valor: R$ ${item.price}` }
              <Link
                to={ `/productdetails/${item.id}` }
                key={ item.id }
              >
                Mais detalhes
              </Link>
              <button
                type="button"
                onClick={ () => addToCart(item) }
              >
                Adicionar ao carrinho
              </button>
            </ItemCard>
          ))
        }
      </>
    );
  }
}

Itens.propTypes = {
  itens: teste.object,
}.isRequired;
