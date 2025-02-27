import {
  freeMemoryGauge,
  nonHeapMemoryGauge,
  totalMemoryGauge
} from '../metrics/applicationMetrics';
import os from 'os';

const totalMemory = totalMemoryGauge.set(os.totalmem());

export function startNonHeapMemoryCollection() {
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    nonHeapMemoryGauge.set(memoryUsage.external);
  }, 5000);
}

export function collectSystemMemoryMetrics() {
  setInterval(() => {
    freeMemoryGauge.set(os.freemem());
  }, 5000);
}
