import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body'), this.usersController.updateUser);
    this.router.patch(`${this.path}`, validationMiddleware(CreateUserDto, 'body', true), authMiddleware, this.usersController.updateInfoUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    this.router.get(`${this.path}/groups`, authMiddleware, this.usersController.getGroupsOfUser);
    this.router.post(`${this.path}/groups/:groupId(\\d+)`, authMiddleware, this.usersController.addGroupToUser);
    this.router.delete(`${this.path}/groups/:groupId(\\d+)`, authMiddleware, this.usersController.removeGroupFromUser);
  }
}

export default UsersRoute;
