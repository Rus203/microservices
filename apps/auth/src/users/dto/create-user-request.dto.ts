import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  password: string;
}
