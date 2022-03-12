import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
