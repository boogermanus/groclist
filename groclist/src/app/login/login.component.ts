import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthModel } from './auth-model';
import {AuthService} from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordRequest } from './password-request';
const CHANGE_PASSWORD = 'changePassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
      private readonly _fb: FormBuilder,
      private readonly _loginService: AuthService,
      private readonly _router: Router,
      private readonly _route: ActivatedRoute,
    ) {
    this.formLogin = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: [''],
      confirmPassword: [''],
    });
    this.loginError = false;
  }

  public formLogin: FormGroup;
  public loginError = false;
  public changePassword = false;
  public match = false;

  public ngOnInit() {
    this.changePassword = (this._route.snapshot.queryParams[CHANGE_PASSWORD] === 'true');
  }

  public submit(): void {
    if (!this.changePassword) {
      this.login();
    } else {
      this.change();
    }
  }

  private login() {
    if (this.formLogin.controls.email.valid && this.formLogin.controls.password.valid) {
      this._loginService.login(
        new AuthModel(this.formLogin.controls.email.value, this.formLogin.controls.password.value))
        .subscribe(response => this.setSession(response), error => {
        if (error.status === 401) {
          this.loginError = true;
        } else {
          console.log(error);
        }
      });
    }
  }

  private change() {
    const password = this.formLogin.controls.password.value;
    const newPassword = this.formLogin.controls.newPassword.value;
    const confirmPassword = this.formLogin.controls.confirmPassword.value;
    const email = this.formLogin.controls.email.value;

    if (newPassword !== confirmPassword) {
      this.match = true;
      return;
    } else {
      this.match = false;
    }

    this._loginService.changePassword(new PasswordRequest(email, password, newPassword))
    .subscribe(response => {
      this._router.navigate(['/']);
    }, error => {
      if (error.status === 401) {
        this.loginError = true;
      }
    });
  }

  public getError(pControlName: string) {
    return this.formLogin.controls[pControlName].touched
    && this.formLogin.controls[pControlName].hasError('required');
  }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    this.loginError = false;
    this._router.navigate(['/']);
  }

}
