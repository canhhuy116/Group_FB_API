import { CreateLikedPostDto } from '@dtos/likedPost.dto';
import { LikedPost } from '@interfaces/likedPost.interface';
import LikedPostService from '@services/likedPost.service';
import { NextFunction, Request, Response } from 'express';

class LikedPostsController {
  public LikedPostService = new LikedPostService();

  public getLikedPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLikedPostsData: LikedPost[] = await this.LikedPostService.findAllLikedPost();

      res.status(200).json({ data: findAllLikedPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLikedPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostId = req.params.post_id;
      const UserId = Number(req.params.user_id);
      const findOneLikedPostData: LikedPost = await this.LikedPostService.findLikedPostById(PostId, UserId);

      res.status(200).json({ data: findOneLikedPostData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLikedPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LikedPostData: CreateLikedPostDto = req.body;
      const createLikedPostData: LikedPost = await this.LikedPostService.createLikedPost(LikedPostData);

      res.status(201).json({ data: createLikedPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLikedPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostId = req.params.post_id;
      const UserId = Number(req.params.user_id);
      const deleteLikedPostData: LikedPost = await this.LikedPostService.deleteLikedPost(PostId, UserId);

      res.status(200).json({ data: deleteLikedPostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LikedPostsController;
