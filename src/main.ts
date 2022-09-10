import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS
  app.enableCors();

  // Set Global Prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Set Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prisma
  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  // Swagger / OpenAPI Config
  const docsConfig = new DocumentBuilder()
    .setTitle('Projektor API')
    .setDescription('The Projektor API documentation')
    .setVersion('1.0')
    .addTag('projektor')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Projektor API Docs',
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
