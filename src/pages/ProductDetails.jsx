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
    console.log(productdetails);
    return (
      <>
        <div>ProductDetails</div>
        { !loading
        && <div>
            <h2>{ productdetails.title }</h2>
            <img src={ productdetails.thumbnail } alt={ productdetails.title } />
            <p>{ productdetails.price }</p>
            { productdetails.attributes
              .map((atr) => (
                <div>
                  <p>{ atr.name }</p>
                  <p>{ atr.value_name }</p>
                </div>
              )) }
            </div>
        }
      </>
    );
  }
}
