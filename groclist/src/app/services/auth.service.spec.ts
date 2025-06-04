import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {provideHttpClient} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
