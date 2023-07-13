import { AbstractRepository } from '@app/common';
import { User } from './schemas/user.schema';
import { Injectable, Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
