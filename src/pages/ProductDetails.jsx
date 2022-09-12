import React, { Component } from 'react';
import teste from 'prop-types';
import { getProductById } from '../services/api';
import './ProductDetails.css';
import FormAvaliacao from './FormAvaliacao';

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
    const { addToCart } = this.props;
    return (
      <div className="card">
        { !loading
        && (
          <div>
            <h2 data-testid="product-detail-name">{ productdetails.title }</h2>
            <img
              data-testid="product-detail-image"
              src={ productdetails.thumbnail }
              alt={ productdetails.title }
            />
            <p
              data-testid="product-detail-price"
              className="price"
            >
              { `Preço: R$ ${productdetails.price}` }
            </p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => addToCart(productdetails) }
            >
              Comprar
            </button>
            { productdetails.attributes
              .map((atr) => (
                <div className="details" key={ atr.id }>
                  <p>{ atr.name }</p>
                  <p>{ atr.value_name }</p>
                </div>
              )) }
            <FormAvaliacao id={ productdetails.id } />
          </div>)}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: teste.shape({
    params: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
