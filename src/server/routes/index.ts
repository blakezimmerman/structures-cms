import structuresRoutes from './structures.routes';
import usersRoutes from './users.routes';

const ApiRoutes = (app: any) => {
  app.use("/api/structures", structuresRoutes);
  app.use("/api/users", usersRoutes);
}

export default ApiRoutes;
