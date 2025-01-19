import { Router } from 'express';
import SessionController from '../controllers/sessionController';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
