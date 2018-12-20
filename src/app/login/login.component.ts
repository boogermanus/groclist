import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from './auth-request';
import {LoginService} from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
      private readonly _fb: FormBuilder,
      private readonly _loginService: LoginService,
      private readonly _router: Router,
    ) {
    this.formLogin = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginError = false;
  }

  public formLogin: FormGroup;
  public loginError: boolean = false;

  public ngOnInit() {
  }

  public submit(): void {
    if (this.formLogin.controls.email.valid && this.formLogin.controls.password.valid)
    {
      this._loginService.login(new AuthRequest(
        this.formLogin.controls.email.value,
        this.formLogin.controls.password.value,
      )).subscribe(response => this.setSession(response),
      error => {
        if (error.status === 401)
          this.loginError = true;
        else
          console.log(error);
      });
    }
  }
  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    this.loginError = false;
    this._router.navigate(['/']);
  }

}
