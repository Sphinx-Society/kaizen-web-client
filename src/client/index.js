import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './routes/App';

const container = document.getElementById('app');
function renderApp() {
  render(
    <Provider store={store}>
      <App />
    </Provider>, container,
  );
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes/App', () => {
    renderApp();
  });
}
