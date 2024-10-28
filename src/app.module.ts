import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PlanetModule } from './planet/planet.module';
import { SWAPIModule } from './swapi/swapi.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorInterceptor } from './swapi/infrastructure/interceptors/http-error.interceptor';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PlanetModule,
    SWAPIModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpErrorInterceptor
    }
  ],
})
export class AppModule {}
