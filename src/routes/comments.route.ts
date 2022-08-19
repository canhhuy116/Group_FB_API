import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import CommentController from '@/controllers/comments.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateCommentDto } from '@dtos/comments.dto';

class CommentRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public CommentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CommentController.getComments);
    this.router.get(`${this.path}/:id`, this.CommentController.getCommentById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCommentDto, 'body', true), this.CommentController.createComment);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCommentDto, 'body', true), this.CommentController.updateComment);
    this.router.delete(`${this.path}/:id`, this.CommentController.deleteComment);
  }
}

export default CommentRoute;
