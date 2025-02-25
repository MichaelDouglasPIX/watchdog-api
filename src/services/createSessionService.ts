import authConfig from '../config/auth';
import { Secret, sign } from 'jsonwebtoken';
import AppError from '../config/AppError';
import { CreateSession, UserAuthenticated } from '../models/Session';

export default class CreateSessionService {
  public static async execute({
    username,
    password
  }: CreateSession): Promise<UserAuthenticated> {
    if (!username || !password) {
      throw new AppError('required fields for authentication are missing');
    }

    const secret: string = authConfig.jwt.secret;
    const expire: number = authConfig.jwt.expiresIn;

    if (!secret && !expire) {
      throw new AppError(
        'required fields for authentication configuration are missing'
      );
    }

    const token = sign({}, secret as Secret, {
      subject: username,
      expiresIn: expire
    });

    return {
      username,
      token
    };
  }
}
