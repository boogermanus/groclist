import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthModel } from '../auth-model';
import {AuthService} from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordRequest } from '../password-request';
const CHANGE_PASSWORD = 'changePassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginError = false;
  public changePassword = false;
  public match = false;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly authService: AuthService,
      private readonly router: Router,
      private readonly route: ActivatedRoute,
    ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: [''],
      confirmPassword: [''],
    });
    this.loginError = false;
  }

  public ngOnInit() {
    this.changePassword = (this.route.snapshot.queryParams[CHANGE_PASSWORD] === 'true');
  }

  public submit(): void {
    if (!this.changePassword) {
      this.login();
    } else {
      this.change();
    }
  }

  public login() {
    if (this.formLogin.controls['email'].valid && this.formLogin.controls['password'].valid) {
      this.authService.login(new AuthModel(this.formLogin.controls['email'].value, this.formLogin.controls['password'].value))
      .subscribe({
        next(data:any) {
          localStorage.setItem('token', data.token);
          this.loginError = false;
          this.router.navigate(['/']);
        },
        error(error) {
          if(error.status === 401) {
            this.loginError = true;
          }
          else  {
            console.log(error);
          }
        },
        complete() {
          this.router.navigate(['/'])
        }
      });
    }
  }

  private change() {
    const password = this.formLogin.controls['password'].value;
    const newPassword = this.formLogin.controls['newPassword'].value;
    const confirmPassword = this.formLogin.controls['confirmPassword'].value;
    const email = this.formLogin.controls['email'].value;

    if (newPassword !== confirmPassword) {
      this.match = true;
      return;
    } else {
      this.match = false;
    }

    this.authService.changePassword(new PasswordRequest(email,password,newPassword))
      .subscribe({
        next(data) {
          this.router.navigate(['/']);
        },
        error(error) {
          if(error.status === 401) {
            this.loginError = true
          }
          else {
            console.log(error);
          }
        }
      });
  }

  public getError(pControlName: string) {
    return this.formLogin.controls[pControlName].touched
    && this.formLogin.controls[pControlName].hasError('required');
  }

  public setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    this.loginError = false;
    this.router.navigate(['/']);
  }

  public register(): void {
    this.router.navigate(['/register']);
  }
}
