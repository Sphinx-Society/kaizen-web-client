import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

const App = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route) => <Route key={route.path} {...route} />)}
    </Switch>
  </BrowserRouter>
);

export default App;
