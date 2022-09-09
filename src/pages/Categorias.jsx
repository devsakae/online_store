import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';

class Categorias extends React.Component {
  render() {
    const { categorias } = this.props;
    return (
      <div className="categorias">
        <ul>
          {
            categorias.map((categoria) => (
              <Link to={ `/${categoria.id}` } key={ categoria.id }>
                <li
                  data-testid="category"
                  key={ categoria.id }
                >
                  { categoria.name }
                </li>
              </Link>
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
