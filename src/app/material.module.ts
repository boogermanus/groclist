import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
} from '@angular/material';
@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
    ],
})
export class MaterialModule {

}