import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateInfoUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const userData: CreateUserDto = req.body;
      const updateInfoUserData: User = await this.userService.updateInfoUser(userId, userData);

      res.status(200).json({ data: updateInfoUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getGroupsOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const getGroupsOfUserData: number[] = await this.userService.getGroupsOfUser(userId);

      res.status(200).json({ data: getGroupsOfUserData, message: 'getGroupsOfUser' });
    } catch (error) {
      next(error);
    }
  };

  public addGroupToUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const groupId = Number(req.params.groupId);
      const addGroupToUserData: number[] = await this.userService.addGroupToUser(userId, groupId);

      res.status(200).json({ data: addGroupToUserData, message: 'added' });
    } catch (error) {
      next(error);
    }
  };

  public removeGroupFromUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const groupId = Number(req.params.groupId);
      const removeGroupFromUserData: number[] = await this.userService.removeGroupFromUser(userId, groupId);

      res.status(200).json({ data: removeGroupFromUserData, message: 'removed' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
