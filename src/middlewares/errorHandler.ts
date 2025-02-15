/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../config/AppError';
import { logLevelCounter } from '../metrics/httpMetrics';
import Logger from '../utils/logger';

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error instanceof AppError ? error.statusCode : 500;
  const errorLogger = {
    status,
    method: request.method,
    url: request.originalUrl,
    body: request.body || 'N/A',
    error_message: error.message
  };

  logLevelCounter.inc({ level: 'error', status });

  if (error instanceof AppError) {
    Logger.warn(request, errorLogger);
    return response.status(error.statusCode).json({
      status: error.statusCode,
      error: {
        message: error.message
      }
    });
  }

  const errorResponse = {
    status: 500,
    error: {
      message: 'Internal server error'
    }
  };

  Logger.error(request, errorLogger);

  if (error.stack) {
    Logger.error(request, error.stack);
  }
  return response.status(500).json(errorResponse);
}

export default errorHandler;
