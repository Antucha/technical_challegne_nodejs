import { forwardRef, Module } from '@nestjs/common';
import { PlanetService } from './application/planet.service';
import { PlanetController } from './infraestructure/controller/planet.controller';
import { PlanetRepository } from './infraestructure/db-nosql/planet.repository';
import { AuthModule } from '@/auth/auth.module';

const REPOSITORIES = [
  PlanetRepository
];

const SERVICES = [
  PlanetService
];

const CONTROLLERS = [
  PlanetController
];

@Module({
  imports: [
    forwardRef(() => AuthModule)
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...REPOSITORIES]
})
export class PlanetModule {}
