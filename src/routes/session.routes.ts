import { Router } from 'express';
import SessionController from '../controllers/sessionController';
import { attachControllerInfo } from '../middlewares/attachControllerInfo';

const sessionsRouter = Router();
const sessionsController = new SessionController();

const controller = 'sessionsController';

sessionsRouter.post(
  '/',
  attachControllerInfo(controller, 'create'),
  sessionsController.create
);

export default sessionsRouter;
