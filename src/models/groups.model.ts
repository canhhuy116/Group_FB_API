import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Group } from '@interfaces/groups.interface';

export type GroupCreationAttributes = Optional<Group, 'id' | 'owner' | 'name'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> implements Group {
  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public owner: number;
  public admins: number[];
  public members: number[];
  public posts: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof GroupModel {
  GroupModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      type: {
        defaultValue: 'Public',
        type: DataTypes.CHAR(10),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      owner: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      admins: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      members: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      posts: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
    },
    {
      tableName: 'groups',
      sequelize,
    },
  );

  return GroupModel;
}
