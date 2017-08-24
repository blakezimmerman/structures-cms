const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack/webpack.dev');
const compiler = webpack(webpackConfig);

const webpackBuild = (app: any) => {
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    stats: {
      colors: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
  }));
}

export default webpackBuild;
