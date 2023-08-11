import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async create(email: string, age: number): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      age,
      myFavoriteFoods: [],
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto) {
    return this.usersRepository.findAndUpdate({ userId }, userUpdates);
  }
}
