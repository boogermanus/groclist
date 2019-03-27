import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GrocListDetailComponent } from './groc-list-detail.component';
import { MaterialModule } from 'app/material.module';
import { GrocListModule } from 'app/groc-list/groc-list.module';
import { GrocListFilterPipe } from './groc-list-detail-filter.pipe';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpModule,
        HttpClientModule,
        MaterialModule,
        GrocListModule,
    ],
    exports: [
        GrocListDetailComponent,
    ],
    declarations: [
        GrocListDetailComponent,
        GrocListFilterPipe,
    ],
    providers: [ ],
})
export class GrocListDetailModule { }