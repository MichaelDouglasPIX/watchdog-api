import { context, SpanStatusCode, trace } from '@opentelemetry/api';

export function TraceMethod(className?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error(
        `@TraceMethod must be applied to a method, but got: ${typeof descriptor}`
      );
    }

    const originalMethod = descriptor.value;
    const resolvedClassName = className || target.constructor.name;

    descriptor.value = async function (...args: any[]) {
      const tracer = trace.getTracer('watchdog-api');
      const span = tracer.startSpan(
        `${resolvedClassName}.${propertyKey}`,
        {},
        context.active()
      );

      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error: any) {
        span.recordException(error);
        span.setStatus({ code: SpanStatusCode.ERROR });

        const lastArgument = args[args.length - 1];

        if (lastArgument && typeof lastArgument === 'function') {
          args[lastArgument](error);
        } else {
          throw error;
        }
      } finally {
        span.end();
      }
    };
  };
}
