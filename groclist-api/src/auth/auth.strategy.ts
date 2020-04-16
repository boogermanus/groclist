import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {IJwtPayload} from '../DTO/jwt-payload.dto';
import * as config from 'config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secretOrKeyProvider'),
        });
    }

    public async validate(pPayload: IJwtPayload) {
        const value = await this.authService.validate(pPayload);

        if (!value)
            throw new UnauthorizedException();
        else
            return value;
    }
}