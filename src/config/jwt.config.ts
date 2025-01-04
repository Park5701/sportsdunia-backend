import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'supersecretkey',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION || '3600s',
  },
};
