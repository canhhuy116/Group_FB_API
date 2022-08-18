import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import GroupModel from '@models/groups.model';
import PostModel from '@/models/posts.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const DB = {
  Users: UserModel(sequelize),
  Groups: GroupModel(sequelize),
  Posts: PostModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
