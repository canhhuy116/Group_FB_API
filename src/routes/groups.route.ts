import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import GroupsController from '@/controllers/groups.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateGroupDto } from '@dtos/groups.dto';

class Groups implements Routes {
  public path = '/groups';
  public router = Router();
  public groupsController = new GroupsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.groupsController.getGroups);
    this.router.get(`${this.path}/:id(\\d+)`, this.groupsController.getGroupById);
    this.router.post(`${this.path}`, validationMiddleware(CreateGroupDto, 'body', true), this.groupsController.createGroup);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateGroupDto, 'body', true), this.groupsController.updateGroup);
    this.router.delete(`${this.path}/:id(\\d+)`, this.groupsController.deleteGroup);
  }
}

export default Groups;
