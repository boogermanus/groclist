import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GrocListComponent } from './groc-list.component';
import { GrocListRoutingModule } from './groc-list-routing.module';
import { MaterialModule } from 'app/material.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        GrocListRoutingModule,
        HttpModule,
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