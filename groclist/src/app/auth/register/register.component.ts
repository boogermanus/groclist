import {CommonModule} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BaseAuthComponent} from '../baseauth.component';
import {AuthService} from '../../services/auth.service';
import {RegisterModel} from '../../models/register-model';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseAuthComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public emailControl: FormControl<string> =new FormControl<string>('', [Validators.required, Validators.email]);
  public passwordControl: FormControl<string> = new FormControl<string>('', [Validators.required]);
  public confirmPasswordControl: FormControl<string> = new FormControl<string>('', [Validators.required]);
  public unableToRegister = false;
  public registrationSuccessful = false;
  public subscription: Subscription = null;

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  constructor() {
    super();
  }

  public ngOnInit(): void {
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
          } else {
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
