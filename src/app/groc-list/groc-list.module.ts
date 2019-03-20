import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { GrocListComponent } from './groc-list.component';
import { GrocListDetailComponent } from '../groc-list-detail/groc-list-detail.component';
import { GrocListService } from './groc-list.service';
import { GrocListRoutingModule } from './groc-list-routing.module';
import {GrocListFilterPipe} from './groclist-filter.pipe';
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
        GrocListDetailComponent,
        GrocListFilterPipe,
    ],
    providers: [ GrocListService ],
})
export class GrocListModule { }