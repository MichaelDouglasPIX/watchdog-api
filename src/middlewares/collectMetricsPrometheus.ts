import { NextFunction, Request, Response } from 'express';
import {
  httpRequestCounter,
  httpRequestDurationHistogram
} from '../metrics/httpMetrics';

function collectMetricsPrometheus(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.path === '/metrics') return next();

  const end = httpRequestDurationHistogram.startTimer({
    method: request.method,
    route: request.path
  });

  response.on('finish', () => {
    httpRequestCounter.inc({
      method: request.method,
      status: response.statusCode
    });
    end({ status: response.statusCode });
  });

  next();
}

export default collectMetricsPrometheus;
