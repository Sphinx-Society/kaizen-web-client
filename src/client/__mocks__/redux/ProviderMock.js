import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import '@babel/polyfill';

const ProviderMock = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

export default ProviderMock;
