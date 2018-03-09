const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const nodeExternals = require('../scripts/node-externals');

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  externals: nodeExternals,
  entry: [
    'babel-polyfill',
    join(__dirname, '../src/ssr/index')
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.ssr.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
});
