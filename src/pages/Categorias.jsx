import React from 'react';
import teste from 'prop-types';

class Categorias extends React.Component {
  render() {
    const { categorias } = this.props;
    return (
      <ul>
        {
          categorias.map((categoria) => (
            <li
              data-testid="category"
              key={ categoria.id }
            >
              { categoria.name }
            </li>
          ))
        }
      </ul>
    );
  }
}

export default Categorias;

Categorias.propTypes = {
  categorias: teste.shape({}),
}.isRequired;
