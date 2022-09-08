import React from 'react';

class Categorias extends React.Component {
  render() {
    const { categorias } = this.props;
    return (
      <ul>
        {
          categorias.map((categoria) => {
          <li
            data-testid='category'
            key={categoria.id}
          >
          {categoria.name}
          </li>
          })
        }
      </ul>
    );
  }
}

export default Categorias;
