const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../dist');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: BUILD_DIR,
    filename: 'app.[hash].bundle.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
