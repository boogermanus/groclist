import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/iauth-response';
import { AuthModel } from '../models/auth-model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_URL = config.authAPI;
  constructor(private readonly httpClient: HttpClient) { }

  public login(model: AuthModel): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.AUTH_URL}/login`, model);
  }
}
