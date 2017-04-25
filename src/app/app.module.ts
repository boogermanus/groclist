import { NgModule } from '@angular/core';
import { GrocListModule } from './groclist/groc-list.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GrocListModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
