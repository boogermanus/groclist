import { NgModule } from '@angular/core';
import { GrocListModule } from './groc-list/groc-list.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    GrocListModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
