import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <>
      <Header
        searchInput={ this.searchInput }
        searchValue={ searchValue }
        searchButton={ this.searchButton }
      />
      <div className="container-row">
        { !loading
        && (
          <ul className="categorias">
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
        )}
    );
    </>
  }
}
