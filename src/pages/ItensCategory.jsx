import { useEffect, useState } from 'react';
import teste from 'prop-types';
import { useParams } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Itens from './Itens';
import Loading from './Loading';

function ItensCategory(props) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { addToCart } = props;
  const { id } = useParams();
  useEffect(() => {
    const fetchEm = async () => {
      const response = await getProductsFromCategoryAndQuery(id);
      setItems(response.results);
      setLoading(false);
    };
    fetchEm();
  }, [id]);

  return (
    <>
      { loading && <Loading /> }
      { !loading && items.length < 1 && <p>Nada foi encontrado.</p> }
      { !loading && items.length > 0
      && (<Itens itens={ items } addToCart={ addToCart } />) }
    </>
  );
}

ItensCategory.propTypes = {
  id: teste.string,
}.isRequired;

export default ItensCategory;
