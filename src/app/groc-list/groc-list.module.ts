import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GrocListComponent } from './groc-list.component';
import { GrocListRoutingModule } from './groc-list-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        GrocListRoutingModule,
        HttpClientModule,
        MaterialModule,
    ],
    exports: [
        GrocListComponent,
    ],
    declarations: [
        GrocListComponent,
    ],
})
export class GrocListModule { }