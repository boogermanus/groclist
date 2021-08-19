import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModel} from './auth-model';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PasswordRequest} from './password-request';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _jwtService: JwtHelperService) {

  }

  public login(pAuthRequest: AuthModel) {
    return this._http.post<AuthModel>(environment.authAPI + '/login',
      pAuthRequest);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return this._jwtService.isTokenExpired(token);
  }

  public userId(): string {
    const token = localStorage.getItem('token');
    const decoded: any = this._jwtService.decodeToken(token);
    return decoded.nameid;
  }

  public changePassword(pChangeRequest: PasswordRequest) {
    return this._http.post<PasswordRequest>(environment.authAPI + '/changepassword',
      pChangeRequest);
  }
}
