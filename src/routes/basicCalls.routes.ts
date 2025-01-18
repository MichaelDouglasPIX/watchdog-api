import { Router } from 'express';
import BasicCallsController from '../controllers/basicCallsController';

const basicCallsRouter = Router();
const basicCallsController = new BasicCallsController();

basicCallsRouter.get('/', basicCallsController.simpleCall);
basicCallsRouter.get('/latency', basicCallsController.latencyCall);
basicCallsRouter.post('/', basicCallsController.callWithData);

export default basicCallsRouter;
