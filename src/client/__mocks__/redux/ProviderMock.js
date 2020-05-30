import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import store from '../../redux/store';

const ProviderMock = (props) => {
  const mockStore = configureStore([]);
  const customStore = props.store ? mockStore(props.store) : store;

  return (
    <Provider store={customStore}>
      {props.children}
    </Provider>
  );
};

export default ProviderMock;
