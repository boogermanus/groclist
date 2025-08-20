import {Component, inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseAuthComponent} from '../baseauth.component';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {AuthModel} from '../../models/auth-model';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseAuthComponent implements OnInit {
  public formGroup: FormGroup;
  public loginError = false;
  public emailControl: FormControl<string> = new FormControl<string>('', [Validators.required, Validators.email]);
  public passwordControl: FormControl<string> = new FormControl<string>('', Validators.required);

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  public submit(): void {
    this.authService.login(new AuthModel(this.emailControl.value, this.passwordControl.value))
      .subscribe({
        next: (response) => {
          this.authService.authenticate(response.token)
          this.router.navigate(['/'])
        },
        error: (error) => this.loginError = true
      })
  }

  public register(): void {
    this.router.navigate(['/register']);
  }

}
