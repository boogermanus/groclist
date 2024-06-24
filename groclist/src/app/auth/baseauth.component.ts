import { AbstractControl } from "@angular/forms";

export class BaseAuthComponent {
    public isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.hasError(error);
    }
}