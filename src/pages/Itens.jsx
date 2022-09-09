import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';

export default class Itens extends React.Component {
  render() {
    const { itens } = this.props;
    return (
      <div>
        {
          itens.length < 1 ? (<p>Nenhum produto foi encontrado</p>)
            : (
              itens.map((item) => (
                <Link to={ `/productdetails/${item.id}` } key={ item.id }>
                  <div
                    key={ item.id }
                    data-testid="product"
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
