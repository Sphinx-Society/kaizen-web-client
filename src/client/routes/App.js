import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';
import ExamsManagement from '../components/pages/ExamsManagement/ExamsManagement';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/exams-management' component={ExamsManagement} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
