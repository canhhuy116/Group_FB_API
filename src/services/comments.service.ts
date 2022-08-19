import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Comment } from '@/interfaces/comments.interface';
import { isEmpty } from '@utils/util';
import { CreateCommentDto } from '@/dtos/comments.dto';

class CommentService {
  public Comments = DB.Comments;

  public async findAllComment(): Promise<Comment[]> {
    const allComment: Comment[] = await this.Comments.findAll();
    return allComment;
  }

  public async findCommentById(CommentId: string): Promise<Comment> {
    if (isEmpty(CommentId)) throw new HttpException(400, 'CommentId is empty');

    const findComment: Comment = await this.Comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    return findComment;
  }

  public async createComment(CommentData: CreateCommentDto): Promise<Comment> {
    if (isEmpty(CommentData)) throw new HttpException(400, 'CommentData is empty');

    const createCommentData: Comment = await this.Comments.create(CommentData);
    return createCommentData;
  }

  public async updateComment(CommentId: string, CommentData: CreateCommentDto): Promise<Comment> {
    if (isEmpty(CommentData)) throw new HttpException(400, 'CommentData is empty');

    const findComment: Comment = await this.Comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await this.Comments.update(CommentData, { where: { id: CommentId } });

    const updateComment: Comment = await this.Comments.findByPk(CommentId);
    return updateComment;
  }

  public async deleteComment(CommentId: string): Promise<Comment> {
    if (isEmpty(CommentId)) throw new HttpException(400, "Comment doesn't existId");

    const findComment: Comment = await this.Comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await this.Comments.destroy({ where: { id: CommentId } });

    return findComment;
  }
}

export default CommentService;
