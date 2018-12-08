import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthRequest } from './auth-request';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class LoginService {
    constructor(
        private readonly _http: HttpClient,
        private readonly _jwtService: JwtHelperService) {

    }

    public login(pAuthRequest: AuthRequest) {
        return this._http.post<AuthRequest>(environment.authAPI + '/login',
        pAuthRequest);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        return this._jwtService.isTokenExpired(token);
    }
}