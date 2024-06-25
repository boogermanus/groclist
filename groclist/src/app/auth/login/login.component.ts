import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseAuthComponent } from '../baseauth.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/auth-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseAuthComponent {
  public formGroup: FormGroup;
  public loginError = false;
  public emailControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  public passwordControl = new FormControl('', Validators.required);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
      super();
      this.formGroup = this.formBuilder.group({
        email: this.emailControl,
        password: this.passwordControl
      })

    }

  public submit(): void {
    this.authService.login(new AuthModel(this.emailControl.value, this.passwordControl.value))
      .subscribe({
        next: (response) => { 
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']) 
        },
        error: (error) => console.log(error)
      })
  }

  public register(): void {
    this.router.navigate(['/register']);
  }

}
