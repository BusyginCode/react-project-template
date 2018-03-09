import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

import Router from '../components/Router';

import reducers from '../client/modules';

global.SSR = true;

const store = createStore(reducers, applyMiddleware(thunk));

export default ({ clientStats }) => async (req, res) => {
    let context = {};

    const appString = global.SSR ? renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Router />
        </StaticRouter>
      </Provider>
    ) : '';

    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.render('index', {
        appString,
        js,
        styles,
        cssHash
    });
};
