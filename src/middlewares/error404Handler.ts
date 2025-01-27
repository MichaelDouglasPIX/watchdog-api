import { NextFunction, Request, Response } from 'express';
import AppError from '../config/AppError';

function error404Handler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const error404 = new AppError(
    `Cannot find route: ${request.originalUrl}`,
    404
  );
  next(error404);
}

export default error404Handler;
