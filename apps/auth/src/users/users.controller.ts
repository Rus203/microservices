import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get()
  async GetUsers() {
    return this.usersService.getAllUsers();
  }
}
