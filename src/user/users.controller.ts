import { Controller, Param, Get, Body, Put, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId')
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const { email, age } = dto;
    return this.usersService.create(email, age);
  }

  @Put()
  async updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, dto);
  }
}
