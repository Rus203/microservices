import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/schemas/user.schema';
import { Response } from 'express';

export interface TokenPayLoad {
  userId: string;
}
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayLoad = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(
      tokenPayload,
      this.configService.get('SECRET'),
    );

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }

  logOut(response: Response) {
    response.cookie('Authentication', '', {
      expires: new Date(),
      httpOnly: true,
    });
  }
}
