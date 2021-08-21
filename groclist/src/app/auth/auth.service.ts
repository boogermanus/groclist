import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModel} from './auth-model';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PasswordRequest} from './password-request';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtHelperService) {

  }

  public login(model: AuthModel) {
    return this.httpClient.post<AuthModel>(`${environment.authAPI}/login`,
      model);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtService.isTokenExpired(token);
  }

  public userId(): string {
    const token = localStorage.getItem('token');
    const decoded: any = this.jwtService.decodeToken(token);
    return decoded.nameid;
  }

  public changePassword(model: PasswordRequest) {
    return this.httpClient.post<PasswordRequest>(`${environment.authAPI}/changepassword`,
      model);
  }

  public register(model: AuthModel) {
    return this.httpClient.post<AuthModel>(`${environment.authAPI}/register`, model);
  }
}
