import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthRequest } from './auth-request';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
    constructor(private _http: HttpClient) {

    }

    public login(pAuthRequest: AuthRequest) {
        return this._http.post<AuthRequest>(environment.authAPI + '/login',
        pAuthRequest);
    }
}