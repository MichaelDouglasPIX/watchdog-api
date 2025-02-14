import { Request } from 'express';
import Logger from './logger';

export default async function simulateLatency(
  request: Request
): Promise<number> {
  const ms = Math.floor(Math.random() * 20000);
  Logger.log(request, `[simulateLatency] - ms:`, ms);

  return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}
