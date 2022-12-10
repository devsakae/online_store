import React from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';

class Categorias extends React.Component {
  render() {
    const { categorias } = this.props;
    return (
      <nav>
        <ul className="categorias">
          {
            categorias.map((categoria) => (
              <Link
                to={ `/category/${categoria.id}` }
                key={ categoria.id }
              >
                <li>{ categoria.name }</li>
              </Link>
            ))
          }
        </ul>
      </nav>
    );
  }
}

export default Categorias;

Categorias.propTypes = {
  categorias: teste.shape({}),
}.isRequired;
