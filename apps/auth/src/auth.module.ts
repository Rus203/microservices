import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataBaseModule, RmqModule } from '@app/common';
import { UsersModel } from './users/users.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DataBaseModule,
    UsersModel,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // add LocalStrategy, JwtStrategy later
})
export class AuthModule {}
