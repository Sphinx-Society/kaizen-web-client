import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const ProviderWrapper = ({ children, store }) => {
  return (

    <Provider store={store}>
      {children}
    </Provider>
  );

};

export default ProviderWrapper;

