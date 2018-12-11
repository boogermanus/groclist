import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { GrocListModule } from './groc-list/groc-list.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { LoginService } from './login/login.service';
import { AuthGuardService } from './login/auth-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {JwtInterceptor} from './login/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    GrocListModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [ LoginService, AuthGuardService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
