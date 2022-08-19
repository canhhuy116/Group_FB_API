import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public post_id: string;

  @IsNumber()
  public user_id: number;

  @IsNumber()
  public parent_id: string;

  @IsString()
  public content: string;
}
