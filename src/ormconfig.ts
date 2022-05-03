import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medium_user',
  password: '123',
  database: 'medium_clone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // ts - for dev, js - for prod
  synchronize: true, // not for production
};

export default config;
