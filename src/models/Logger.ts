import { Request } from 'express';

export interface LoggerRequest {
  status: string;
  request?: Request;
}
