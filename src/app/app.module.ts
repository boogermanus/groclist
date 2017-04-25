import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GrocListComponent } from './groclist/groc-list.component';
import { GrocListService } from './groclist/groc-list.service';

@NgModule({
  declarations: [
    AppComponent,
    GrocListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ GrocListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
