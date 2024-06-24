import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formGroup: FormGroup;
  public loginError = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {
      this.formGroup = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

  public submit(): void {
    
  }

}
