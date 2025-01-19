import { Counter, Histogram, register } from '../config/prometheus';

export const authUserSuccess = new Counter({
  name: 'auth_user_Success',
  help: 'Total authenticated users'
});

export const authUserErrors = new Counter({
  name: 'auth_user_error',
  help: 'Total authenticated errors'
});

register.registerMetric(authUserSuccess);
register.registerMetric(authUserErrors);
