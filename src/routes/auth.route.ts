import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { authMiddleware, refreshTokenMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { AuthUserDto } from '@dtos/auth.dto';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(AuthUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}refresh-token`, refreshTokenMiddleware, this.authController.refreshToken);
  }
}

export default AuthRoute;
