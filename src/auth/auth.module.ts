import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controller/auth.controller';
import { AuthService } from './application/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/strategy/jwt.strategy';
import { AdminGuard } from './application/guard/admin.guard';
import { ConfigModule } from '@nestjs/config';
// import { jwtConstants } from './constants';

const CONTROLLERS = [AuthController];

const RESOLVERS = [];

const SERVICES = [AuthService, JwtStrategy, AdminGuard];

const REPOSITORIES = [];

const VALIDATORS = []

const TO_REFACTOR = []

const EXPORTS = [];


@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '700h' },
    }),
  ],
  controllers: CONTROLLERS,
  providers: [...SERVICES, ...VALIDATORS],
  exports: [JwtModule, ...SERVICES]
})
export class AuthModule {}
