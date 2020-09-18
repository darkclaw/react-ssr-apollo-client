import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../views/Home';
import About from '../../views/About';

const App = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default App;
