import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import ApiRoutes from './routes';
import webpackBuild from './webpackBuild';

const app = express();
const ENV = process.env.NODE_ENV || 'development';
const url = 'http://localhost:3000';
const port = 3000;
const dist = path.resolve(__dirname, '../../dist/');
export const secret = 'This is my super secure secret string';

app.use(bodyParser.json());
app.use(cookieParser(secret))

ApiRoutes(app);

if (ENV === 'development') {
  webpackBuild(app);
} else {
  app.use(express.static(dist));
  app.get('/*', (req, res) =>
    res.sendFile(dist + '/index.html')
  );
}

app.listen(port, () =>
  console.log('Listening on ' + url)
);
