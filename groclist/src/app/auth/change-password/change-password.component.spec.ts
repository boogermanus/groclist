import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import {provideHttpClient} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordComponent],
      providers: [
        provideHttpClient(),
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
