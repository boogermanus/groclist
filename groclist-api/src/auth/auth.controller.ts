import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService)
    {}

    @Post('login')
    public async login(@Body() pBody) {
        return await this.authService.login(pBody.username, pBody.password);
    }

    @Get('verify')
    @UseGuards(AuthGuard())
    public async verify(@Body() pBody) {
        return await this.authService.verify(pBody.token);
    }

    @Get('decode')
    @UseGuards(AuthGuard())
    public async decode(@Body() pBody) {
        return await this.authService.decode(pBody.token);
    }

    @Post('changepassword')
    public async changePassword(@Body() pBody) {
            return await this.authService.changePassword(pBody.username,
                pBody.password, pBody.newPassword);
    }
}