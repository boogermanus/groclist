import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatOptionModule,
} from '@angular/material';
@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatOptionModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatOptionModule,
    ],
})
export class MaterialModule {

}