declare namespace Express {
  interface Request {
    requestId: string;
    controllerName?: string;
    methodName?: string;
  }
}
