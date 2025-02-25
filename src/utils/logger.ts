import axios from 'axios';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LoggerRequest } from '../models/Logger';
import { TraceMethod } from '../services/tracingDecorator';

class Logger {
  @TraceMethod()
  public static async log(request?: Request, ...args: any[]) {
    console.log(`[LOG]`, ...args);
    const status = 'info';
    void this.registerOnLoki(
      {
        status,
        request
      },
      args
    );
  }

  @TraceMethod()
  public static async error(request?: Request, ...args: any[]) {
    console.log(`[ERROR]`, ...args);
    const status = 'error';
    void this.registerOnLoki(
      {
        status,
        request
      },
      args
    );
  }

  @TraceMethod()
  public static async warn(request?: Request, ...args: any[]) {
    console.log(`[WARN]`, ...args);
    const status = 'warn';
    void this.registerOnLoki(
      {
        status,
        request
      },
      args
    );
  }

  private static async registerOnLoki(
    { status, request }: LoggerRequest,
    args: any[]
  ) {
    const url = 'http://loki:3100/loki/api/v1/push';

    const headers = {
      'Content-Type': 'application/json'
    };

    const logString = args
      .map(item => (typeof item === 'string' ? item : JSON.stringify(item)))
      .join(' ');

    const date = new Date();
    const timestampInMilliseconds = date.getTime();
    const timestampInNanoseconds = timestampInMilliseconds * 1000000;

    const requestId = request?.requestId ?? uuidv4();

    const payload = {
      streams: [
        {
          stream: {
            application: 'watchdog-api',
            level: status,
            request_id: requestId,
            method: request?.method ?? 'N/A',
            route: request?.route?.path ?? 'N/A',
            controller: request?.controllerName ?? 'N/A',
            function: request?.methodName ?? 'N/A',
            ip: request?.ip ?? 'N/A',
            timestamp: timestampInMilliseconds.toString()
          },
          values: [[timestampInNanoseconds.toString(), logString]]
        }
      ]
    };

    try {
      await axios.post(url, payload, {
        headers
      });
    } catch (error: any) {
      console.error(
        '[loki] error:',
        error.response ? error.response.data : error.message
      );
    }
  }
}

export default Logger;
