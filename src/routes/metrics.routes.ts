import { Request, Response, Router } from 'express';
import { register } from '../config/prometheus';

const metricsRouter = Router();

metricsRouter.get('/', async (request: Request, response: Response) => {
  response.set('Content-Type', register.contentType);
  response.end(await register.metrics());
});

export default metricsRouter;
