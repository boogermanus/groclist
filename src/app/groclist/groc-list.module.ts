import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GrocListComponent } from './groc-list.component'
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
    declarations: [ GrocListComponent],
    providers: [ GrocListService ]
})
export class GrocListModule { }