import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../redux/reducers/LoginReducers/loginReducers';
import initialState from '../../redux/store/initialState';

const store = createStore(reducer, initialState);

const ProviderMock = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

export default ProviderMock;
