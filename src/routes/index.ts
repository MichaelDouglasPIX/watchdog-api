import { Router } from 'express';
import basicCallsRouter from './basicCalls.routes';

const routes = Router();

routes.use('/', basicCallsRouter);

export default routes;
