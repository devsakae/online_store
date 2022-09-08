import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import { getCategories } from './services/api';
import Categorias from './pages/Categorias';

class App extends React.Component {
  state = {
    categorias: [],
  }

  componentDidMount() {
    fecthApi = async () => {
      const api = await getCategories();
      this.setState({
        categorias: api.results,
      })
    }
    fecthApi();
  }

  render(){
    const { categorias } = this.state;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Search
            searchString={ false }
          />
        </Route>
        <Route path='/categorias'>
          <Categorias categorias={ categorias }/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;
