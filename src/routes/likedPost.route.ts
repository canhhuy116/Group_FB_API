import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import LikedPostController from '@/controllers/likedPost.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateLikedPostDto } from '@dtos/likedPost.dto';

class LikedPostRoute implements Routes {
  public path = '/likedPost';
  public router = Router();
  public LikedPostController = new LikedPostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.LikedPostController.getLikedPosts);
    this.router.get(`${this.path}/:post_id/:user_id`, this.LikedPostController.getLikedPostById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLikedPostDto, 'body'), this.LikedPostController.createLikedPost);
    this.router.delete(`${this.path}/:post_id/:user_id`, this.LikedPostController.deleteLikedPost);
  }
}

export default LikedPostRoute;
