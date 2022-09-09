import React from 'react';
import teste from 'prop-types';

export default class Itens extends React.Component {
  render() {
    const { itens } = this.props;
    return (
      <div>
        {
          itens.length < 1 ? (<p>Nenhum produto foi encontrado</p>)
            : (
              itens.map((item) => (
                <div
                  key={ item.id }
                  data-testid="product"
                >
                  <p>{ item.title }</p>
                  <p>{ item.price }</p>
                  <img src={ item.thumbnail } alt={ item.title } />
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
