import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  AlwaysOnSampler,
  SimpleSpanProcessor
} from '@opentelemetry/sdk-trace-base';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const provider = new NodeTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: `watchdog-api`,
    [ATTR_SERVICE_VERSION]: '1.0'
  }),
  sampler: new AlwaysOnSampler()
});

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()]
});

const exporter = new OTLPTraceExporter({
  url: 'http://jaeger:4318/v1/traces'
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
