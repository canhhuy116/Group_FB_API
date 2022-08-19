import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Comment } from '@/interfaces/comments.interface';

export type CommentCreationAttributes = Optional<Comment, 'id' | 'content' | 'user_id' | 'post_id' | 'parent_id'>;

export class CommentModel extends Model<Comment, CommentCreationAttributes> implements Comment {
  public id: string;
  public content: string;
  public user_id: number;
  public post_id: string;
  public parent_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommentModel {
  CommentModel.init(
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
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: 'comments',
      sequelize,
    },
  );

  return CommentModel;
}
