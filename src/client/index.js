import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';

import Router from '../components/Router'

const store = createStore(
  reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
);

const render = () => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
    document.getElementById('react-root')
  );
};

render();

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('../components/Router', () => {
    render()
  });
}
