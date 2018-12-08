import { NgModule } from '@angular/core';
import { GrocListModule } from './groc-list/groc-list.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { LoginService } from './login/login.service';

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
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
