import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '../auth-model';
import { AuthService } from '../auth.service';
import { BaseAuthComponent } from '../base-auth-component';

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
              private readonly authService: AuthService) {
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
        success => { console.log(success); },
        error => this.handleRegistrationError(error));
  }

  private handleRegistrationError(error: any) {
    if (error.error.DuplicateUserName !== undefined) {
      this.unableToRegister = true;
    }
  }
}
