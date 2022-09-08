import React, { Component } from 'react';
import teste from 'prop-types';

export default class Search extends Component {
  render() {
    const { searchString } = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder="Pesquisar por..."
        />
        <div>
          { !searchString
            ? (
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            ) : (
              <p>Resultado da pesquisa vai aparecer aqui</p>
            ) }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchString: teste.string,
}.isRequired;
