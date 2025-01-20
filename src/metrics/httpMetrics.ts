import { Counter, Histogram, register } from '../config/prometheus';

export const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests received',
  labelNames: ['method', 'status']
});

export const httpRequestDurationHistogram = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 15, 30]
});

export const logLevelCounter = new Counter({
  name: 'logback_events_total',
  help: 'Count of log events by level',
  labelNames: ['level']
});

register.registerMetric(logLevelCounter);
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDurationHistogram);
