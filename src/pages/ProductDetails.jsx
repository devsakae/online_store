import React, { Component } from 'react';
import teste from 'prop-types';
import { Link } from 'react-router-dom';
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
            <p data-testid="product-detail-price">{ productdetails.price }</p>
            <Link to="/carrinho">
              <button data-testid="shopping-cart-button" type="button">
                Adicionar ao carrinho
              </button>
            </Link>
            { productdetails.attributes
              .map((atr) => (
                <div key={ atr.id }>
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
