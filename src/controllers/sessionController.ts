import { NextFunction, Request, Response } from 'express';
import CreateSessionService from '../services/createSessionService';
import { authUserErrors, authUserSuccess } from '../metrics/authMetrics';

export default class SessionController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { username, password } = request.body;

      const createSession = await CreateSessionService.execute({
        username,
        password
      });

      authUserSuccess.inc();
      return response.json(createSession);
    } catch (error) {
      authUserErrors.inc();
      next(error);
    }
  }
}
