import { NextFunction, Request, Response } from 'express';
import CreateSessionService from '../services/createSessionService';
import { authUserErrors, authUserSuccess } from '../metrics/authMetrics';
import Logger from '../utils/logger';
import { TraceMethod } from '../services/tracingDecorator';

export default class SessionController {
  @TraceMethod()
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      Logger.log(request, `[session] - create: route executed`);
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
