import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
      private readonly _fb: FormBuilder,
      private readonly _http: HttpClient,
    ) {
    this.formLogin = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  formLogin: FormGroup;

  ngOnInit() {
  }

  submit(): void {
      this._http.post(environment.authAPI + '/login',{
        email: this.formLogin.controls.username,
        password: this.formLogin.controls.password,
      });
  }

}
