import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { AuthResponse } from '../DTO/auth-response.dto';
import { IJwtPayload } from '../DTO/jwt-payload.dto';
import { AppService } from '../app.service';
import { UserService } from '../user/user.service';
import { User } from '../entity/User';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService)
    {}

    public async login(pEmail: string, pPassword: string): Promise<AuthResponse> {

        const user = await this.userService.findOne(pEmail);
        if (user != null && await user.validatePassword(pPassword))
        {
            const instance = AppService.instanceId;
            const token = await this.jwtService.sign({email: pEmail, instanceId: instance});
            return new AuthResponse(token);
        }
        else
            throw new UnauthorizedException();
    }

    public async changePassword(pUsername: string, pPassword: string, pNewPassword: string): Promise<User> {
        const user = await this.userService.findOne(pUsername);

        if (user != null && await user.validatePassword(pPassword)) {
            await user.setPassword(pNewPassword);
            await this.userService.save(user);
        }
        else
            throw new UnauthorizedException();

        return user;
    }

    public async validate(pJwtPayload: IJwtPayload): Promise<boolean> {
        const instance = AppService.instanceId;
        const user = await this.userService.findOne(pJwtPayload.email);
        if (pJwtPayload.email === user.username && pJwtPayload.instanceId === instance)
            return true;
        else
            throw new UnauthorizedException();
    }

    public async verify(token: string): Promise<object> {
        return await this.jwtService.verify(token);
    }

    public async decode(token: string) {
        return await this.jwtService.decode(token, {complete: true});
    }
}
