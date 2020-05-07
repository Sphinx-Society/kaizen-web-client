import React from 'react';
import { render } from 'react-dom';
import App from './routes/App';

const container = document.getElementById('app');

function renderApp() {
  render(<App />, container);
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes/App', () => {
    renderApp();
  });
}
