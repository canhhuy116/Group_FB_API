import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public address: string;
  public status: boolean;
  public groups: number[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      address: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      status: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      groups: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
