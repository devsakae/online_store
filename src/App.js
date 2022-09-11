import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import teste from 'prop-types';
import { getCategories } from './services/api';
import { getLocal, saveLocal } from './services/localhost';
import Carrinho from './pages/Carrinho';
import Itens from './pages/Itens';
import ProductDetails from './pages/ProductDetails';
import Header from './pages/Header';
import ItensCategory from './pages/ItensCategory';

class App extends React.Component {
  state = {
    loading: true,
    categorias: [],
    listItens: [],
    searchedItens: false,
    searchValue: '',
    myCart: [],
  };

  componentDidMount() {
    const myCart = getLocal();
    const fecthApi = async () => {
      const api = await getCategories();
      this.setState({
        categorias: api,
        loading: false,
      });
    };
    fecthApi();
    if (myCart) this.setState({ myCart });
  }

  searchInput = ({ target: { value } }) => {
    this.setState({
      searchValue: value,
    });
  };

  searchButton = async () => {
    const { searchValue } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchValue}`;
    const response = await fetch(url);
    const objJason = await response.json();
    const itens = objJason.results;
    this.setState({
      listItens: itens,
      searchValue: '',
      searchedItens: true,
    });
  };

  addToCart = (produto) => {
    const { myCart } = this.state;
    myCart.push(produto);
    this.setState({ myCart });
    saveLocal(myCart);
  };

  render() {
    const { categorias, loading, listItens, searchedItens, searchValue } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header
              searchInput={ this.searchInput }
              searchValue={ searchValue }
              searchButton={ this.searchButton }
            />
            { !loading
              && (
                <ul className="categorias">
                  {
                    categorias.map((categoria) => (
                      <Link
                        to={ `/category/${categoria.id}` }
                        key={ categoria.id }
                      >
                        <li
                          data-testid="category"
                          key={ categoria.id }
                        >
                          { categoria.name }
                        </li>
                      </Link>
                    ))
                  }
                </ul>
              )}
            { !searchedItens
              && (
                <h3 data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </h3>
              ) }
            { searchedItens
              && (
                <Itens
                  itens={ listItens }
                  addToCart={ this.addToCart }
                />
              ) }
          </Route>
          <Route exact path="/carrinho">
            <Carrinho
              searchInput={ this.searchInput }
              searchValue={ searchValue }
              searchButton={ this.searchButton }
              categorias={ categorias }
            />
          </Route>
          <Route
            path="/category/:id"
            render={ (routeProps) => (
              <ItensCategory
                { ...routeProps }
                searchInput={ this.searchInput }
                searchValue={ searchValue }
                searchButton={ this.searchButton }
                addToCart={ this.addToCart }
              />
            ) }
          />
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
