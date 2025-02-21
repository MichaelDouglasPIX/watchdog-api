import { Context, context, Span, trace } from '@opentelemetry/api';

function createSpan(name: string): Span {
  const currentTracer = trace.getTracer('watchdog-api');
  const currentContext = context.active();

  const span = currentTracer.startSpan(
    'BasicCallsController.simpleCall',
    {},
    currentContext
  );

  return span;
}

export { createSpan };

//span.setAttribute('custom-attr', 'test-value');
