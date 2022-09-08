import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import { getCategories } from './services/api';
import Categorias from './pages/Categorias';

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
            <Search
              searchString={ false }
            />
            { !loading && <Categorias categorias={ categorias } /> }
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
