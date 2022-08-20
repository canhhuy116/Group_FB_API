import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { LikedPost } from '@/interfaces/likedPost.interface';

export type LikedPostCreationAttributes = Optional<LikedPost, 'user_id' | 'post_id'>;

export class LikedPostModel extends Model<LikedPost, LikedPostCreationAttributes> implements LikedPost {
  public user_id: number;
  public post_id: string;

  public readonly createdAt!: Date;
}

export default function (sequelize: Sequelize): typeof LikedPostModel {
  LikedPostModel.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'liked_post',
      sequelize,
    },
  );

  return LikedPostModel;
}
