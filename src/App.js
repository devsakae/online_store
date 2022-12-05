import React from 'react';
import './App.css';
import teste from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getCategories } from './services/api';
import { getLocal, saveLocal } from './services/localhost';
import Carrinho from './pages/Carrinho';
import Itens from './pages/Itens';
import ProductDetails from './pages/ProductDetails';
import Header from './pages/Header';
import ItensCategory from './pages/ItensCategory';
import Categorias from './pages/Categorias';

class App extends React.Component {
  state = {
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
    const { categorias, listItens, searchedItens, searchValue } = this.state;

    return (
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <Switch>
          <Route exact path="/">
            <Header
              searchInput={ this.searchInput }
              searchValue={ searchValue }
              searchButton={ this.searchButton }
            />
            <div className="container-row">
              <Categorias categorias={ categorias } />
              { searchedItens
                ? (
                  <Itens
                    itens={ listItens }
                    addToCart={ this.addToCart }
                  />
                )
                : (
                  <div data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </div>
                ) }
            </div>
          </Route>
          <Route exact path="/carrinho">
            <Header
              searchInput={ this.searchInput }
              searchValue={ searchValue }
              searchButton={ this.searchButton }
            />
            <div className="container-row">
              <Categorias categorias={ categorias } />
              { searchedItens
                ? (
                  <Itens
                    itens={ listItens }
                    addToCart={ this.addToCart }
                  />
                ) : (<Carrinho />) }
            </div>
          </Route>
          <Route
            path="/category/:id"
            render={ (routeProps) => (
              <>
                <Header
                  searchInput={ this.searchInput }
                  searchValue={ searchValue }
                  searchButton={ this.searchButton }
                />
                <div className="container-row">
                  <Categorias categorias={ categorias } />
                  { searchedItens
                    ? (
                      <Itens
                        itens={ listItens }
                        addToCart={ this.addToCart }
                      />
                    ) : (
                      <ItensCategory
                        { ...routeProps }
                        searchInput={ this.searchInput }
                        searchValue={ searchValue }
                        searchButton={ this.searchButton }
                        addToCart={ this.addToCart }
                      />) }
                </div>
              </>
            ) }
          />
          <Route
            path="/productdetails/:id"
            render={ (routeProps) => (
              <>
                <Header
                  searchInput={ this.searchInput }
                  searchValue={ searchValue }
                  searchButton={ this.searchButton }
                />
                <div className="container-row">
                  <Categorias categorias={ categorias } />
                  { searchedItens
                && (
                  <Itens
                    itens={ listItens }
                    addToCart={ this.addToCart }
                  />
                ) }
                  <ProductDetails
                    { ...routeProps }
                    addToCart={ this.addToCart }
                  />
                </div>
              </>
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

App.propTypes = {
  searchInput: teste.func,
  searchButton: teste.func,
  addToCart: teste.func,
}.isRequired;
