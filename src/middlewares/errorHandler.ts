/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../config/AppError';
import { logLevelCounter } from '../metrics/httpMetrics';

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error('[error]:', error);
  logLevelCounter.inc({ level: 'error' });

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      error: {
        message: error.message
      }
    });
  }

  return response.status(500).json({
    status: 500,
    error: {
      message: 'Internal server error'
    }
  });
}

export default errorHandler;
