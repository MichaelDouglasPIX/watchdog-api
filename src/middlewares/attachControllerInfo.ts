import { NextFunction, Request, Response } from 'express';

export function attachControllerInfo(
  controllerName: string,
  methodName: string
) {
  return (request: Request, response: Response, next: NextFunction) => {
    request.controllerName = controllerName;
    request.methodName = methodName;
    next();
  };
}
