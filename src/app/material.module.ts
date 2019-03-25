import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
} from '@angular/material';
@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
    ],
})
export class MaterialModule {

}