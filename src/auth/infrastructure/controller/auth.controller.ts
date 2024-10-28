import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserLoginInput } from '../input/user-login.input.dto';
import { Request, Response } from 'express';
import { AuthService } from '@/auth/application/auth.service';
import { UserRegisterInput } from '../input/user-register.input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signin')
    @ApiOperation({ summary: 'Login user in the system' })
    async login(@Body() input: UserLoginInput, @Res() response: Response): Promise<void> {
   
        const email: string = input.email.trim().toLowerCase();
        const { password } = input;
        const { role } =  input
        console.log(role)
        const loginData = await this.authService.login(email, password, role);

        const { status } = {status: 200};

        response.status(status).json(loginData);
    }

    @Post('/signup')
    @ApiOperation({ summary: 'Register user in the system' })
    async register(@Body() input: UserRegisterInput, @Res() response: Response) : Promise<void> {
        
        await this.authService.register(input)

        const { status } = { status: 200 }
        
        response.status(status).json(true)
    }
}
