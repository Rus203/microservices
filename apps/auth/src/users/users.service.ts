import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);

    // check it out later
    return this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
  }

  async validateCreateUserRequest(request: CreateUserRequest) {
    let candidate: User;

    try {
      candidate = await this.usersRepository.findOne({ email: request.email });
    } catch (error) {}

    if (candidate) {
      throw new UnprocessableEntityException('Email already existed');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  async getAllUsers() {
    return this.usersRepository.find({});
  }
}