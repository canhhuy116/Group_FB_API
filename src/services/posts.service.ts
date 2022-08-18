import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Post } from '@/interfaces/posts.interface';
import { isEmpty } from '@utils/util';
import { CreatePostDto } from '@/dtos/posts.dto';

class PostService {
  public posts = DB.Posts;

  public async findAllPost(): Promise<Post[]> {
    const allPost: Post[] = await this.posts.findAll();
    return allPost;
  }

  public async findPostById(postId: string): Promise<Post> {
    if (isEmpty(postId)) throw new HttpException(400, 'postId is empty');

    const findPost: Post = await this.posts.findByPk(postId);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    return findPost;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');

    const createPostData: Post = await this.posts.create(postData);
    return createPostData;
  }

  public async updatePost(postId: string, postData: CreatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');

    const findPost: Post = await this.posts.findByPk(postId);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    await this.posts.update(postData, { where: { id: postId } });

    const updatePost: Post = await this.posts.findByPk(postId);
    return updatePost;
  }

  public async deletePost(postId: string): Promise<Post> {
    if (isEmpty(postId)) throw new HttpException(400, "Post doesn't existId");

    const findPost: Post = await this.posts.findByPk(postId);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    await this.posts.destroy({ where: { id: postId } });

    return findPost;
  }
}

export default PostService;
