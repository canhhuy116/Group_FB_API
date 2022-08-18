import { IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public content: string;

  @IsNumber()
  public user_id: number;

  @IsNumber()
  public group_id: number;
}
