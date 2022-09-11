import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
import './Itens.css';

export default class Itens extends React.Component {
  render() {
    const { itens } = this.props;
    return (
      <div className="main">
        {
          itens.length < 1 ? (<p>Nenhum produto foi encontrado</p>)
            : (
              itens.map((item) => (
                <Link
                  to={ `/productdetails/${item.id}` }
                  key={ item.id }
                  data-testid="product-detail-link"
                >
                  <div
                    key={ item.id }
                    data-testid="product"
                    className="item"
                  >
                    <p>{ item.title }</p>
                    <p>{ item.price }</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                  </div>
                </Link>
              )))
        }
      </div>
    );
  }
}

Itens.propTypes = {
  itens: teste.object,
}.isRequired;
