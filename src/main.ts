import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('SportsDunia API')
    .setDescription('API documentation for SportsDunia Backend')
    .setVersion('1.0')
    .addBearerAuth() // 🔥 Add authentication to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 3000}`);
  console.log(`📄 Swagger Docs available at http://localhost:${process.env.PORT || 3000}/api/docs`);
}

bootstrap(); // ✅ Remove typo
