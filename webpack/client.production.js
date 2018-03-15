const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  name: 'client',
  target: 'web',
  entry: [
    join(__dirname, '../src/client/index')
  ],
  devtool: 'hidden-source-map',
  output: {
    filename: 'app.client.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.scss/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css", {
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new StatsWebpackPlugin('stats.json'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
