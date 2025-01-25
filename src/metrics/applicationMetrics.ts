import { Gauge, register } from '../config/prometheus';

export const totalMemoryGauge = new Gauge({
  name: 'node_memory_total_bytes',
  help: 'Total memory in bytes'
});

export const freeMemoryGauge = new Gauge({
  name: 'node_memory_free_bytes',
  help: 'Freee memory in bytes'
});

export const nonHeapMemoryGauge = new Gauge({
  name: 'nodejs_nonheap_memory_bytes',
  help: 'Amount of non-heap memory used in bytes'
});

register.registerMetric(nonHeapMemoryGauge);
register.registerMetric(totalMemoryGauge);
register.registerMetric(freeMemoryGauge);
