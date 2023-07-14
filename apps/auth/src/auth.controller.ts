import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './users/schemas/user.schema';
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res() response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
