import { NgModule } from '@angular/core';
import { GrocListModule } from './groclist/groc-list.module';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GrocListModule,
    AppRoutingModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
