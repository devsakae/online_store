import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teste from 'prop-types';
import { getProductById } from '../services/api';
import './ProductDetails.css';
import FormAvaliacao from './FormAvaliacao';

export default function ProductDetails(props) {
  const [loading, setLoading] = useState(true);
  const [productdetails, setDetails] = useState([]);
  const { addToCart } = props;
  const { id } = useParams();

  useEffect(() => {
    const getEm = async () => {
      const response = await getProductById(id);
      console.log(response);
      setLoading(false);
      setDetails(response);
    };
    getEm();
  }, [id]);

  return (
    <div className="card">
      { loading
        ? (<p>Loading...</p>)
        : (
          <div>
            <h2>{ productdetails.title }</h2>
            <img
              src={ productdetails.thumbnail }
              alt={ productdetails.title }
            />
            <p className="price">
              { `Preço: R$ ${productdetails.price}` }
            </p>
            <button
              type="button"
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

ProductDetails.propTypes = {
  id: teste.obj,
}.isRequired;
