import * as express from 'express';
import structuresRoutes from './structures.routes';
import entriesRoutes from './entries.routes';
import usersRoutes from './users.routes';
import authRoutes from './auth.routes';

export const checkMatchFound = (x: any, res: express.Response) =>
  !x.result.n || x.result.n < 1
    ? res.status(500).json('Could not find a matching object')
    : res.json(x);

const ApiRoutes = (app: express.Express) => {
  app.use("/api/structures", structuresRoutes);
  app.use("/api/entries", entriesRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
}

export default ApiRoutes;
