import { NgModule } from '@angular/core';
import { GrocListModule } from './groclist/groc-list.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
  ],
  imports: [
    GrocListModule,
    AppRoutingModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
