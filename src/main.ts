import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplicar pipes globales para validación
  app.useGlobalPipes(new ValidationPipe());

  // Establecer prefijo global para las rutas
  app.setGlobalPrefix('api');

  // Habilitar CORS solo en entorno local
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3000', // Origen del frontend en local
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  } else {
    app.enableCors();
  }

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Star Wars')
    .setDescription('API para consultar información de Star Wars')
    .setVersion('1.0')
    // .addTag('Star Wars')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Escuchar en el puerto 4000
  await app.listen(4000, '0.0.0.0');
}
bootstrap();