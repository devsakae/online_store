/* eslint-disable react/jsx-max-depth */
import React from 'react';
import './App.css';
import teste from 'prop-types';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
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
    const fetchApi = async () => {
      const api = await getCategories();
      this.setState({
        categorias: api,
      });
    };
    fetchApi();
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

  doneSearching = () => {
    this.setState({
      searchedItens: false,
    });
  };

  render() {
    const { categorias, listItens, searchedItens, searchValue } = this.state;

    return (
      <BrowserRouter>
        <HashRouter>
          <Header
            searchInput={ this.searchInput }
            searchValue={ searchValue }
            searchButton={ this.searchButton }
          />
          <div className="container-row">
            <Categorias categorias={ categorias } />
            { searchedItens
              ? (
                <main>
                  <Itens
                    itens={ listItens }
                    addToCart={ this.addToCart }
                    doneSearching={ this.doneSearching }
                  />
                </main>
              )
              : (
                <main>
                  <Switch>
                    <Route exact path="/">
                      <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
                    </Route>
                    <Route exact path="/carrinho">
                      <Carrinho />
                    </Route>
                    <Route path="/category/:id">
                      <ItensCategory
                        searchInput={ this.searchInput }
                        searchButton={ this.searchButton }
                        addToCart={ this.addToCart }
                      />
                    </Route>
                    <Route path="/productdetails/:id">
                      <ProductDetails addToCart={ this.addToCart } />
                    </Route>
                  </Switch>
                </main>
              )}
          </div>
        </HashRouter>
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
