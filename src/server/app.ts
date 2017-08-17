import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import webpackBuild from './webpackBuild';

const app = express();
const server = http.createServer(app);
const ENV = process.env.NODE_ENV || 'development';
const url = 'http://localhost:3000'
const port = 3000;
const dist = path.resolve(__dirname, '../../dist/');

if (ENV === 'development') {
  webpackBuild(app);
} else {
  app.use(express.static(dist));
  app.get('/*', (req, res) =>
    res.sendFile(dist + '/index.html')
  );
}

server.listen(port, () =>
  console.log('Listening on' + url)
);
