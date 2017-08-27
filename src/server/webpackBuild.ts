import * as express from 'express';
import * as path from 'path';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack/webpack.dev');
const compiler = webpack(webpackConfig);

const webpackBuild = (app: express.Express) => {
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    stats: {
      colors: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath: '/'
  }));

  app.use('/*', (req, res, next) => {
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
}

export default webpackBuild;
