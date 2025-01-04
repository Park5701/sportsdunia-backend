import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,    // Use localhost for local development
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true,                  // Auto-sync schema in development
  autoLoadEntities: true,
  ssl: false,                         // ❌ Disable SSL for local database
};
