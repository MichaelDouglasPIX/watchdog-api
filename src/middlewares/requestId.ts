import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const requestIdMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestId = uuidv4();

  request.requestId = requestId;

  response.setHeader('X-Request-Id', requestId);

  next();
};

export default requestIdMiddleware;
