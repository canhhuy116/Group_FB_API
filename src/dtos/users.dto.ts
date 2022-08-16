import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsArray()
  public groups: number[];
}
