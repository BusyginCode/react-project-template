const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const extendedNodeExternals = require('../scripts/extended-node-externals');

module.exports = merge(common, {
  target: 'node',
  externals: extendedNodeExternals,
  node: {
    __dirname: false,
    __filename: false
  },
  entry: [
    'babel-polyfill',
    join(__dirname, '../src/server/index')
  ],
  output: {
    filename: 'server.js',
    path: join(__dirname, '../public/assets/'),
  },
  module: {
    rules: [
      
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});
