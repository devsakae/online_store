import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Itens from './Itens';
import Loading from './Loading';

export default class ItensCategory extends Component {
  state = {
    loading: true,
    searchString: '',
  };

  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const { results } = await getProductsFromCategoryAndQuery(id);
      this.setState({
        loading: false,
        searchString: results,
      });
    };
    getEm();
  }

  render() {
    const { searchString, loading } = this.state;
    const { addToCart } = this.props;
    return (
      <>
        { loading && <Loading /> }
        { !loading && searchString < 1 && <p>Nada foi encontrado.</p> }
        { !loading && searchString > 0
        && (<Itens itens={ searchString } addToCart={ addToCart } />) }
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
