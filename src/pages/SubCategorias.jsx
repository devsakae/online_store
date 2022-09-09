import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductById } from '../services/api';

export default class SubCategorias extends Component {
  state = {
    loading: true,
    subcategorias: [],
  };

  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const subcategorias = await getProductById(id);
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
        { !loading && subcategorias.results.map((subcat) => (<p>{ subcat.title} </p>)) }
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
