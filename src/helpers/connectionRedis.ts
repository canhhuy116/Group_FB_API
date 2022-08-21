import { createClient } from 'redis';

export const createRedisClient = async () => {
  const client = createClient();

  client.on('error', err => console.log('Redis Client Error', err));
  client.on('connect', () => console.log('Redis Client Connected'));
  client.on('ready', () => console.log('Redis Client Ready'));

  await client.connect();
  return client;
};
