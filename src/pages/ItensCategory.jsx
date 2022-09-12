import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Itens from './Itens';
import Loading from './Loading';

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
    const { addToCart } = this.props;
    return (
      loading ? <Loading />
        : (
          <Itens itens={ searchString.results } addToCart={ addToCart } />
        )
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
