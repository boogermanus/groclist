import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseAuthComponent } from '../baseauth.component';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseAuthComponent implements OnDestroy {
  public form: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;
  public unableToRegister = false;
  public registrationSuccessful = false;
  public subscription: Subscription = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
    ) {
    super();

    this.emailControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.passwordControl = new FormControl('', Validators.required);
    this.confirmPasswordControl = new FormControl('', Validators.required);

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    }, {
      validators: this.passwordValidator
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  public submit(): void {
    const model = new RegisterModel(this.emailControl.value, this.passwordControl.value, this.confirmPasswordControl.value);

    this.subscription = this.authService.register(model)
      .subscribe({
        next: (response) => {
          if (response) {
            this.registrationSuccessful = true;
            this.unableToRegister = false;
          }
          else {
            this.unableToRegister = true;
          }
        },
        error: (error) => {
          this.unableToRegister = true;
          console.log(error);
        }
      });
  }
}
