import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { LikedPost } from '@/interfaces/likedPost.interface';
import { isEmpty } from '@utils/util';
import { CreateLikedPostDto } from '@/dtos/likedPost.dto';

class LikedPostService {
  public LikedPosts = DB.LikedPost;

  public async findAllLikedPost(): Promise<LikedPost[]> {
    const allLikedPost: LikedPost[] = await this.LikedPosts.findAll();
    return allLikedPost;
  }

  public async findLikedPostById(PostId: string, UserId: number): Promise<LikedPost> {
    if (isEmpty(PostId)) throw new HttpException(400, 'PostId is empty');
    if (isEmpty(UserId)) throw new HttpException(400, 'UserId is empty');

    const findLikedPost: LikedPost = await this.LikedPosts.findOne({ where: { user_id: UserId, post_id: PostId } });
    if (!findLikedPost) throw new HttpException(409, "LikedPost doesn't exist");

    return findLikedPost;
  }

  public async createLikedPost(LikedPostData: CreateLikedPostDto): Promise<LikedPost> {
    if (isEmpty(LikedPostData)) throw new HttpException(400, 'LikedPostData is empty');

    const createLikedPostData: LikedPost = await this.LikedPosts.create(LikedPostData);
    return createLikedPostData;
  }

  public async deleteLikedPost(PostId: string, UserId: number): Promise<LikedPost> {
    if (isEmpty(PostId)) throw new HttpException(400, 'PostId is empty');
    if (isEmpty(UserId)) throw new HttpException(400, 'UserId is empty');

    const findLikedPost: LikedPost = await this.LikedPosts.findOne({ where: { user_id: UserId, post_id: PostId } });
    if (!findLikedPost) throw new HttpException(409, "LikedPost doesn't exist");

    await this.LikedPosts.destroy({ where: { user_id: UserId, post_id: PostId } });

    return findLikedPost;
  }
}

export default LikedPostService;
