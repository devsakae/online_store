import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import teste from 'prop-types';
import { getCategories } from './services/api';
import Categorias from './pages/Categorias';
import Carrinho from './pages/Carrinho';
import Itens from './pages/Itens';
import SubCategorias from './pages/SubCategorias';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  state = {
    loading: true,
    categorias: [],
    listItens: [],
    haveItens: false,
    name: '',
  };

  componentDidMount() {
    const fecthApi = async () => {
      const api = await getCategories();
      this.setState({
        categorias: api,
        loading: false,
      });
    };
    fecthApi();
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
    const response = await fetch(url);
    const objJason = await response.json();
    const itens = objJason.results;
    this.setState({
      listItens: itens,
      haveItens: true,
    });
  };

  render() {
    const { categorias, loading, listItens, haveItens, name } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Link
              to="/carrinho"
              data-testid="shopping-cart-button"
            >
              🛒 Carrinho de compras
            </Link>
            <input
              data-testid="query-input"
              name="name"
              onChange={ this.onInputChange }
              value={ name }
            />
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            { !loading && <Categorias
              categorias={ categorias }
              buscaSubCategorias={ this.buscaSubCategorias }
            /> }
            { haveItens ? <Itens itens={ listItens } />
              : (
                <h3
                  data-testid="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.

                </h3>)}
          </Route>
          <Route exact path="/carrinho">
            <Carrinho />
          </Route>
          <Route exact path="/:id" component={ SubCategorias } />
          <Route
            exact
            path="/productdetails/:id"
            component={ ProductDetails }

          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

App.propTypes = {
  handleClick: teste.func,
}.isRequired;
