import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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