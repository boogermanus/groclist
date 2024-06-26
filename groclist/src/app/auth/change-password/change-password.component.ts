import { Component } from '@angular/core';
import { BaseAuthComponent } from '../baseauth.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChangePasswordModel } from '../../models/change-password-model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent extends BaseAuthComponent {
  public form: FormGroup;
  public password: FormControl = new FormControl('', Validators.compose([Validators.required]));
  public newPassword: FormControl = new FormControl('', Validators.compose([Validators.required]));
  public confirmNewPassword: FormControl = new FormControl('', Validators.compose([Validators.required]));
  public changeError: boolean = false;
  public changeSuccessful: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {
    super();

    this.form = this.formBuilder.group({
      password: this.password,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    },
      { validators: this.changePasswordValidator });
  }

  public submit(): void {
    this.authService.changePassword(new ChangePasswordModel(this.password.value, this.newPassword.value, this.confirmNewPassword.value))
      .subscribe({
        next: (value) => {
          if (value) {
            this.changeSuccessful = true;
            this.changeError = false;
          }
        },
        error: (error) => {
          this.changeError = true;
          this.changeSuccessful = false;
          console.log(error);
        }
      });
  }
}
