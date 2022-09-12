import React, { Component } from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetails.css';

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
            <Link
              to="/carrinho"
              data-testid="shopping-cart-button"
            >
              <button type="button" className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow" />
                </span>
                <span className="button-text">Comprar</span>
              </button>
            </Link>
            { productdetails.attributes
              .map((atr) => (
                <div className="details" key={ atr.id }>
                  <p>{ atr.name }</p>
                  <p>{ atr.value_name }</p>
                </div>
              )) }
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
