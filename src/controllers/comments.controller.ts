import { CreateCommentDto } from '@dtos/comments.dto';
import { Comment } from '@interfaces/comments.interface';
import CommentService from '@services/comments.service';
import { NextFunction, Request, Response } from 'express';

class CommentsController {
  public CommentService = new CommentService();

  public getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCommentsData: Comment[] = await this.CommentService.findAllComment();

      res.status(200).json({ data: findAllCommentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = req.params.id;
      const findOneCommentData: Comment = await this.CommentService.findCommentById(CommentId);

      res.status(200).json({ data: findOneCommentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentData: CreateCommentDto = req.body;
      const createCommentData: Comment = await this.CommentService.createComment(CommentData);

      res.status(201).json({ data: createCommentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = req.params.id;
      const CommentData: CreateCommentDto = req.body;
      const updateCommentData: Comment = await this.CommentService.updateComment(CommentId, CommentData);

      res.status(200).json({ data: updateCommentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = req.params.id;
      const deleteCommentData: Comment = await this.CommentService.deleteComment(CommentId);

      res.status(200).json({ data: deleteCommentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentsController;
