import { NgModule } from '@angular/core';
import { MatFormField, MatInput} from '@angular/material';
@NgModule({
    imports: [MatFormField, MatInput],
    exports: [MatFormField, MatInput],
})
export class MaterialModule {

}