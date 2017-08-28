const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src/client');

module.exports = {
  entry: [APP_DIR + '/index.tsx'],

  resolve: {
    extensions: ['.js', '.ts','.tsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  module: {
    loaders : [
      {
        test: /\.tsx?$/,
        include : path.resolve(__dirname, '../'),
        use: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:  APP_DIR + '/index.html'
    })
  ]
};
