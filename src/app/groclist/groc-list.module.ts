import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GrocListComponent } from './groc-list.component'
import { GrocListDetailComponent } from './groc-list-detail.component';
import { GrocListService } from './groc-list.service'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    exports: [
        GrocListComponent
    ],
    declarations: [ 
        GrocListComponent,
        GrocListDetailComponent
    ],
    providers: [ GrocListService ]
})
export class GrocListModule { }