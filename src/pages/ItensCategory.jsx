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
    return (
      <>
        <Header />
        { !loading && <Itens itens={ searchString.results } /> }
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
