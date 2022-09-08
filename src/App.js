import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Search
            searchString={ false }
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
