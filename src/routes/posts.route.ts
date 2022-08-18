import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import PostsController from '@/controllers/posts.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreatePostDto } from '@dtos/posts.dto';

class PostsRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public PostsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.PostsController.getPosts);
    this.router.get(`${this.path}/:id`, this.PostsController.getPostById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body', true), this.PostsController.createPost);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePostDto, 'body', true), this.PostsController.updatePost);
    this.router.delete(`${this.path}/:id`, this.PostsController.deletePost);
  }
}

export default PostsRoute;
