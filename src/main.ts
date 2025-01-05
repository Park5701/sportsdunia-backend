import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'; // ✅ Import Exception Filter
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // ✅ Load environment variables

  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for API access (for frontend & external requests)
  app.enableCors();

  // ✅ Global Exception Handling
  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ Swagger Confiimport { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for API access
  app.enableCors();

  // Use Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Setup Swagger API documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();guration
  const config = new DocumentBuilder()
    .setTitle('SportsDunia API')
    .setDescription('API documentation for SportsDunia Backend')
    .setVersion('1.0')
    .addBearerAuth() // ✅ Add JWT Authentication to Swagger
    .build();

  // ✅ Generate Swagger API Documentation
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // ✅ Keeps JWT token even after page refresh
    },
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api/docs`);
}

bootstrap();
