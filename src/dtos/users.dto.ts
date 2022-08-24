import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(6)
  public password: string;

  @IsString()
  public name: string;

  @IsString()
  public address: string;
}
