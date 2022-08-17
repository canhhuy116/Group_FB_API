import { IsString, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
