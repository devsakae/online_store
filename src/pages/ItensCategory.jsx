import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Itens from './Itens';
import Header from './Header';

export default class ItensCategory extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const searchString = await getProductsFromCategoryAndQuery(id);
      this.setState({
        loading: false,
        searchString,
      });
    };
    getEm();
  }

  render() {
    const { searchString, loading } = this.state;
    const { searchInput, searchValue, searchButton, addToCart } = this.props;
    return (
      <>
        <Header
          searchInput={ searchInput }
          searchValue={ searchValue }
          searchButton={ searchButton }
        />
        { !loading && <Itens itens={ searchString.results } addToCart={ addToCart } /> }
      </>
    );
  }
}

ItensCategory.propTypes = {
  match: teste.shape({
    params: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
