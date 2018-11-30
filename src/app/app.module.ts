import { NgModule } from '@angular/core';
import { GrocListModule } from './groc-list/groc-list.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    GrocListModule,
    AppRoutingModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
