import axios from 'axios';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

class Logger {
  public static async log(request?: Request, ...args: any[]) {
    const requestId = request?.requestId ? request?.requestId : uuidv4();
    console.log(`[LOG]`, ...args);
    await this.registerOnLoki('INFO', requestId, args);
  }

  public static async error(request?: Request, ...args: any[]) {
    const requestId = request?.requestId ? request?.requestId : uuidv4();
    console.log(`[ERROR]`, ...args);
    await this.registerOnLoki('ERROR', requestId, args);
  }

  public static async warn(request?: Request, ...args: any[]) {
    const requestId = request?.requestId ? request?.requestId : uuidv4();
    console.log(`[WARN]`, ...args);
    await this.registerOnLoki('WARN', requestId, args);
  }

  private static async registerOnLoki(
    status: string,
    requestId: string,
    log: any[]
  ) {
    const url = 'http://loki:3100/loki/api/v1/push';

    const headers = {
      'Content-Type': 'application/json'
    };

    const logString = log
      .map(item => (typeof item === 'string' ? item : JSON.stringify(item)))
      .join(' ');

    const date = new Date();
    const timestampInMilliseconds = date.getTime();
    const timestampInNanoseconds = timestampInMilliseconds * 1000000;

    const payload = {
      streams: [
        {
          stream: {
            application: 'watchdog-api',
            level: status,
            request_id: requestId,
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
