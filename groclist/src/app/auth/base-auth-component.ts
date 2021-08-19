import { AbstractControl, ValidationErrors } from '@angular/forms';

export class BaseAuthComponent {

    public isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.hasError(error);
    }

    public passwordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('password');
        const confirm = control.get('confirmPassword');

        if (confirm.value !== '' && password.value !== confirm.value) {
            return { password: true };
        }

        return null;
    }
}
