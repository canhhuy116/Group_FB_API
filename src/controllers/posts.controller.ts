import { CreatePostDto } from '@dtos/posts.dto';
import { Post } from '@interfaces/posts.interface';
import PostService from '@services/posts.service';
import { NextFunction, Request, Response } from 'express';

class PostsController {
  public PostService = new PostService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPostsData: Post[] = await this.PostService.findAllPost();

      res.status(200).json({ data: findAllPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostId = req.params.id;
      const findOnePostData: Post = await this.PostService.findPostById(PostId);

      res.status(200).json({ data: findOnePostData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostData: CreatePostDto = req.body;
      const createPostData: Post = await this.PostService.createPost(PostData);

      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostId = req.params.id;
      const PostData: CreatePostDto = req.body;
      const updatePostData: Post = await this.PostService.updatePost(PostId, PostData);

      res.status(200).json({ data: updatePostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PostId = req.params.id;
      const deletePostData: Post = await this.PostService.deletePost(PostId);

      res.status(200).json({ data: deletePostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostsController;
