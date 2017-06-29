import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { GrocListComponent } from './groc-list.component';
import { GrocListDetailComponent } from './groc-list-detail.component';
import { GrocListService } from './groc-list.service';
import { GrocListRoutingModule } from './groc-list-routing.module';

import {GrocListFilterPipe} from './groclist-filter.pipe';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        GrocListRoutingModule,
        HttpModule
    ],
    exports: [
        GrocListComponent
    ],
    declarations: [ 
        GrocListComponent,
        GrocListDetailComponent,
        GrocListFilterPipe
    ],
    providers: [ GrocListService ]
})
export class GrocListModule { }