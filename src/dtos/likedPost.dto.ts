import { IsString, IsNumber } from 'class-validator';

export class CreateLikedPostDto {
  @IsString()
  public post_id: string;

  @IsNumber()
  public user_id: number;
}
