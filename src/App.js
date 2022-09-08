import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { getCategories } from './services/api';
import Search from './pages/Search';
import Categorias from './pages/Categorias';
import Carrinho from './pages/Carrinho';

class App extends React.Component {
  state = {
    loading: true,
    categorias: [],
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

  render() {
    const { categorias, loading } = this.state;
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
            <Search
              searchString={ false }
            />
            { !loading && <Categorias categorias={ categorias } /> }
          </Route>
          <Route exact path="/carrinho">
            <Carrinho />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
