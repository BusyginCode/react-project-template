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
    join(__dirname, '../src/ssr/index'),
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.ssr.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: [
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
});
