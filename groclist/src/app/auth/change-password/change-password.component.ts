import {Component, inject, OnInit} from '@angular/core';
import {BaseAuthComponent} from '../baseauth.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {ChangePasswordModel} from '../../models/change-password-model';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent extends BaseAuthComponent implements OnInit {
  public form: FormGroup;
  public password: FormControl<string> = new FormControl<string>('', [Validators.required]);
  public newPassword: FormControl<string> = new FormControl<string>('', [Validators.required]);
  public confirmNewPassword: FormControl<string> = new FormControl<string>('', [Validators.required]);
  public changeError: boolean = false;
  public changeSuccessful: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
        password: this.password,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword
      },
      {validators: this.changePasswordValidator});
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
