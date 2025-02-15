import { NextFunction, Request, Response } from 'express';
import simulateLatency from '../utils/simulateLatency';
import AppError from '../config/AppError';
import Logger from '../utils/logger';

export default class BasicCallsController {
  constructor(private controller = 'BasicCallsController') {}
  public async simpleCall(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      Logger.log(request, `[simpleCall] - route executed`);

      const currentTime = new Date();

      const returnMessage = { currentTime, message: 'quick test carried out!' };

      return response.send(returnMessage);
    } catch (error) {
      next(error);
    }
  }

  public async callWithData(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      Logger.log(request, `[callWithData] - route executed`);
      Logger.log(request, `[callWithData] - body:`, request.body);

      if (Object.keys(request.body).length === 0) {
        throw new AppError('request body is required');
      }

      const currentTime = new Date();

      const returnMessage = {
        currentTime,
        message: 'quick test carried out!',
        bodyReceived: request.body
      };

      return response.json(returnMessage);
    } catch (error) {
      next(error);
    }
  }

  public async latencyCall(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      Logger.log(request, `[latencyCall] - route executed`);

      const currentTime = new Date();

      const latency = await simulateLatency(request);

      const returnMessage = {
        currentTime,
        message: 'Quick test carried out with random latency!',
        latency: `${latency} seconds`
      };

      Logger.log(request, `[latencyCall] - call latency: ${latency} seconds`);

      return response.send(returnMessage);
    } catch (error) {
      next(error);
    }
  }
}
