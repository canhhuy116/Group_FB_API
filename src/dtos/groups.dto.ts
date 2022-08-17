import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  public name: string;

  @IsString()
  public type: string;

  @IsString()
  public description: string;

  @IsNumber()
  public owner: number;

  @IsArray()
  public admins: number[];

  @IsArray()
  public members: number[];

  @IsArray()
  public posts: string[];
}
