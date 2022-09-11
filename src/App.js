import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import teste from 'prop-types';
import { getCategories } from './services/api';
import Carrinho from './pages/Carrinho';
import Itens from './pages/Itens';
import SubCategorias from './pages/SubCategorias';
import ProductDetails from './pages/ProductDetails';
import Header from './pages/Header';

class App extends React.Component {
  state = {
    loading: true,
    categorias: [],
    listItens: [],
    haveItens: false,
    searchValue: '',
  };

  componentDidMount() {
    const fecthApi = async () => {
      const api = await getCategories();
      this.setState({
        categorias: api,
        loading: false,
        searchValue: '',
      });
    };
    fecthApi();
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
      haveItens: true,
    });
  };

  render() {
    const { categorias, loading, listItens, haveItens, searchValue } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path="/">
              <Header
                searchInput={ this.searchInput }
                searchValue={ searchValue }
                searchButton={ this.searchButton }
              />
              <div className="container-row">
                { !loading
                && (
                  <ul className="categorias">
                    {
                      categorias.map((categoria) => (
                        <Link to={ `/${categoria.id}` } key={ categoria.id }>
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
                { haveItens ? <Itens itens={ listItens } />
                  : (
                    <h3 data-testid="home-initial-message">
                      Digite algum termo de pesquisa ou escolha uma categoria.
                    </h3>
                  )}
              </div>
            </Route>
            <Route exact path="/carrinho">
              <Carrinho
                searchInput={ this.searchInput }
                searchValue={ searchValue }
                searchButton={ this.searchButton }
                categorias={ categorias }
              />
            </Route>
          </div>
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
