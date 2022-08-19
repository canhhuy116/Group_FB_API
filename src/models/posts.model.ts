import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Post } from '@/interfaces/posts.interface';

export type PostCreationAttributes = Optional<Post, 'id' | 'content' | 'user_id' | 'group_id'>;

export class PostModel extends Model<Post, PostCreationAttributes> implements Post {
  public id: string;
  public content: string;
  public user_id: number;
  public group_id: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PostModel {
  PostModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'posts',
      sequelize,
    },
  );

  return PostModel;
}
