import { Router } from 'express';
import basicCallsRouter from './basicCalls.routes';
import metricsRouter from './metrics.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/', basicCallsRouter);
routes.use('/metrics', metricsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
