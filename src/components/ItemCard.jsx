import React from 'react';
import teste from 'prop-types';
import './ItemCard.css';

export default function ItemCard(props) {
  const { children } = props;
  return (
    <div className="itemcard">{ children }</div>
  );
}

ItemCard.propTypes = {
  children: teste.object,
}.isRequired;
