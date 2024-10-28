import { Body, Controller, Post, Res, Req, Get, Query, UseGuards } from '@nestjs/common';
import { UserLoginInput } from '@/auth/infrastructure/input/user-login.input.dto';
import { UserService } from '@/user/application/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/auth/application/guard/admin.guard';
import { Auth } from '@/auth/domain/auth';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

}
