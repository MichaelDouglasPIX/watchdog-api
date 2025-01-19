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

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: username,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      username,
      token
    };
  }
}
