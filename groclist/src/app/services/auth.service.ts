import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/iauth-response';
import { AuthModel } from '../models/auth-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterModel } from '../models/register-model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_URL = config.authAPI;
  private readonly TOKEN = 'token';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtHelperService) { }

  public login(model: AuthModel): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.AUTH_URL}/login`, model);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN);

    return !this.jwtService.isTokenExpired(token ?? '');
  }

  public register(model: RegisterModel): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.AUTH_URL}/login`, model);
  }
}
