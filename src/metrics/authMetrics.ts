import { Counter, register } from '../config/prometheus';

export const authUserSuccess = new Counter({
  name: 'auth_user_success_total',
  help: 'Total authenticated users'
});

export const authUserErrors = new Counter({
  name: 'auth_user_error_total',
  help: 'Total authenticated errors'
});

register.registerMetric(authUserSuccess);
register.registerMetric(authUserErrors);
