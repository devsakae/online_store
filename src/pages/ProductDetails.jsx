import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const getEm = async () => {
      const { match: { params: { id } } } = this.props;
      const productdetails = await getProductById(id);
      this.setState({
        loading: false,
        productdetails,
      });
    };
    getEm();
  }

  render() {
    const { productdetails, loading } = this.state;
    return (
      <>
        <div>ProductDetails</div>
        { !loading && productdetails.title }
        teste
      </>
    );
  }
}
