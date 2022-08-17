import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Group } from '@/interfaces/groups.interface';
import { isEmpty } from '@utils/util';
import { CreateGroupDto } from '@/dtos/groups.dto';

class GroupService {
  public groups = DB.Groups;

  public async findAllGroup(): Promise<Group[]> {
    const allGroup: Group[] = await this.groups.findAll();
    return allGroup;
  }

  public async findGroupById(groupId: number): Promise<Group> {
    if (isEmpty(groupId)) throw new HttpException(400, 'GroupId is empty');

    const findGroup: Group = await this.groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    return findGroup;
  }

  public async createGroup(groupData: CreateGroupDto): Promise<Group> {
    if (isEmpty(groupData)) throw new HttpException(400, 'groupData is empty');

    const createGroupData: Group = await this.groups.create(groupData);
    return createGroupData;
  }

  public async updateGroup(groupId: number, groupData: CreateGroupDto): Promise<Group> {
    if (isEmpty(groupData)) throw new HttpException(400, 'groupData is empty');

    const findGroup: Group = await this.groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    const newAdmins = groupData.admins === undefined ? findGroup.admins : [...findGroup.admins, ...groupData.admins];
    const newMembers = groupData.members === undefined ? findGroup.members : [...findGroup.members, ...groupData.members];
    const newPosts = groupData.posts === undefined ? findGroup.posts : [...findGroup.posts, ...groupData.posts];

    await this.groups.update({ ...groupData, admins: newAdmins, members: newMembers, posts: newPosts }, { where: { id: groupId } });

    const updateGroup: Group = await this.groups.findByPk(groupId);
    return updateGroup;
  }

  public async deleteGroup(groupId: number): Promise<Group> {
    if (isEmpty(groupId)) throw new HttpException(400, "Group doesn't existId");

    const findGroup: Group = await this.groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    await this.groups.destroy({ where: { id: groupId } });

    return findGroup;
  }
}

export default GroupService;
