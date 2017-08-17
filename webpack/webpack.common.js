const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../src/client');

module.exports = {
  entry: APP_DIR + '/index.tsx',

  resolve: {
    extensions: ['.js', '.ts','.tsx']
  },

  module: {
    loaders : [
      {
        test: /\.tsx?$/,
        include : APP_DIR,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:  APP_DIR + '/index.html'
    })
  ]
};
