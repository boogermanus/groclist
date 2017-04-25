import { NgModule } from '@angular/core';
import { GrocListModule } from './groclist/groc-list.module';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    GrocListModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
