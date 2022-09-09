import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Itens from './Itens';

export default class SubCategorias extends Component {
  state = {
    loading: true,
    subcategorias: [],
  };

  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const subcategorias = await getProductsFromCategoryAndQuery(id);
      this.setState({
        loading: false,
        subcategorias,
      });
    };
    getEm();
  }

  render() {
    const { subcategorias, loading } = this.state;
    return (
      <>
        <div>SubCategorias</div>
        { !loading && <Itens itens={ subcategorias.results } /> }
      </>
    );
  }
}

SubCategorias.propTypes = {
  match: teste.shape({
    params: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
