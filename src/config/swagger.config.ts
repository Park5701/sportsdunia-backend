import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('SportsDunia API')
  .setDescription('API documentation for SportsDunia Backend')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
