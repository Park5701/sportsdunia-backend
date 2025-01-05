import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true, 
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  ssl: process.env.DATABASE_HOST?.includes('render.com') 
    ? { rejectUnauthorized: false } 
    : false, // ✅ Enable SSL for Render, Disable for Local
};
