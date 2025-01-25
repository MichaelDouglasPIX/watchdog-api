import {
  Registry,
  Counter,
  Gauge,
  Histogram,
  collectDefaultMetrics
} from 'prom-client';

const register = new Registry();

register.setDefaultLabels({
  app: 'watchdog-api'
});

collectDefaultMetrics({ register });

export { register, Counter, Gauge, Histogram };
