import React from 'react';
import teste from 'prop-types';

class Categorias extends React.Component {
  render() {
    const { categorias } = this.props;
    return (
      <div className="categorias">
        <ul>
          {
            categorias.map((categoria) => (
              <li
                data-testid="category"
                key={ categoria.id }
              >
                <a href="/subs">
                  { categoria.name }
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Categorias;

Categorias.propTypes = {
  categorias: teste.shape({}),
}.isRequired;
