import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserRepository } from './infrastructure/database/repository/user.repository';
import { UserController } from './infrastructure/controller/user.controller';
import { ProfileRepository } from './infrastructure/database/repository/profile.repository';
import { AuthModule } from '@/auth/auth.module';
import { ObjectiveService } from './application/objective.service';
import { ObjectiveAchievementRepository } from './infrastructure/db-nosql/objective-achievement.repository';
import { ObjectiveRegistryRepository } from './infrastructure/db-nosql/objective-registry.repository';

const CONTROLLERS = [UserController];

const RESOLVERS = [];

const SERVICES = [UserService, ObjectiveService, ObjectiveAchievementRepository, ObjectiveRegistryRepository];

const REPOSITORIES = [UserRepository, ProfileRepository];

const VALIDATORS = []

const TO_REFACTOR = []

const EXPORTS = [UserService, ObjectiveService];

@Module({
  imports: [
    forwardRef(() => AuthModule)
  ],
  providers: [...SERVICES, ...REPOSITORIES],
  exports: EXPORTS,
  controllers: [...CONTROLLERS],
})
export class UserModule {}
