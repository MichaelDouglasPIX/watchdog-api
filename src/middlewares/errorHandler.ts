/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../config/AppError';
import { logLevelCounter } from '../metrics/httpMetrics';
import Logger from '../utils/logger';
import { createSpan } from '../utils/trace';
import { SpanStatusCode } from '@opentelemetry/api';

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const span = createSpan('errorHandler');

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

    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
    span.end();

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

  span.recordException(error);
  span.setStatus({ code: SpanStatusCode.ERROR });
  span.end();

  return response.status(500).json(errorResponse);
}

export default errorHandler;
