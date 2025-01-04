import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'nest_user',
  password: process.env.DATABASE_PASSWORD || 'yourpassword',
  database: process.env.DATABASE_NAME || 'sportsdunia',
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
};
