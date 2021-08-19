import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrocListModule } from './groc-list/groc-list.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './auth/jwt-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { GrocListDetailModule } from './groc-list-detail/groc-list-detail.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthModule } from './auth/auth.module';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
  ],
  imports: [
    AuthModule,
    GrocListModule,
    GrocListDetailModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
