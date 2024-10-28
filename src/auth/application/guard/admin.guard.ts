import { StateNumberEnum } from '@/common/domain/enum/state-number.enum';
import { UserService } from '@/user/application/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }


    const user = this.jwtService.verify(token);

    // const USER_ENTITY = await this.userService.getOneByUuid(user.uuid);

    return user.isAdmin;
  }
}