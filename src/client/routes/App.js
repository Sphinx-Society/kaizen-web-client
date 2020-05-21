import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
