import { Router } from 'express';
import BasicCallsController from '../controllers/basicCallsController';
import { attachControllerInfo } from '../middlewares/attachControllerInfo';

const basicCallsRouter = Router();
const basicCallsController = new BasicCallsController();

const controller = 'basicCallsController';

basicCallsRouter.get(
  '/',
  attachControllerInfo(controller, 'simpleCall'),
  basicCallsController.simpleCall
);

basicCallsRouter.get(
  '/latency',
  attachControllerInfo(controller, 'latencyCall'),
  basicCallsController.latencyCall
);

basicCallsRouter.post(
  '/',
  attachControllerInfo(controller, 'callWithData'),
  basicCallsController.callWithData
);

export default basicCallsRouter;
