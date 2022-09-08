import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './pages/Search';
import Carrinho from './pages/Carrinho';

function App() {
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
        </Route>
        <Route exact path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
