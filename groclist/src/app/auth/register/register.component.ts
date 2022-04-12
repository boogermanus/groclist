import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../auth-model';
import { AuthService } from '../auth.service';
import { BaseAuthComponent } from '../base-auth-component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseAuthComponent implements OnInit {

  public form: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;
  public unableToRegister = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
    super();
    this.emailControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.passwordControl = new FormControl('', Validators.required);
    this.confirmPasswordControl = new FormControl('', Validators.required);

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    },
      {
        validators: this.passwordValidator
      });

  }

  ngOnInit(): void {
  }

  public submit(): void {
    const model = new AuthModel(this.emailControl.value, this.passwordControl.value);

    this.authService
      .register(model)
      .subscribe(
        success => {
          console.log(success);
          this.router.navigate(['/login'])
          },
        error => this.handleRegisterError(error));
  }

  private handleRegisterError(error: any) {
    if (error.error.DuplicateUserName) {
      this.unableToRegister = true;
    }

    this.hasPasswordError(error);

    console.log(error);
  }
}
