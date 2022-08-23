import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }

  public async updateInfoUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email || userData.groups) throw new HttpException(409, "You can't update email or groups");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async addGroupToUser(userId: number, groupId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');
    if (isEmpty(groupId)) throw new HttpException(400, 'groupId is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const findGroup: User = await this.users.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    if (findUser.groups.includes(groupId)) throw new HttpException(409, 'User already in group');

    const newGroups = findUser.groups.concat(groupId);

    await this.users.update({ groups: newGroups }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }
}

export default UserService;
