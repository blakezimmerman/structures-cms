const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    filename: 'app.bundle.js'
  }
});
