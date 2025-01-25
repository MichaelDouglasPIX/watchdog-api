import {
  collectSystemMemoryMetrics,
  startNonHeapMemoryCollection
} from './nonHeapMemoryJob';

export function startScheduler() {
  startNonHeapMemoryCollection();
  collectSystemMemoryMetrics();
}
