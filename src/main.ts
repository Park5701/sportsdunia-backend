import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'; // ✅ Import this

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for API access
  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter()); // ✅ Use exception filter

  
  // Setup Swagger API documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();

