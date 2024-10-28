import { Server } from 'http';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedServer: Server;
async function bootstrapServer(): Promise<Server> {
  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  // Aplicar pipes globales para validación
  app.useGlobalPipes(new ValidationPipe());

  // Establecer prefijo global para las rutas
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar Swagger
  const config = new DocumentBuilder()
  .setTitle('API de Star Wars')
  .setDescription('API para consultar información de Star Wars')
  .setVersion('1.0')
  // .addTag('Star Wars')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  
  return createServer(expressApp);
}


export const handler: Handler = async (event: any, context: Context): Promise<Response> => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

