import { AbstractControl, ValidationErrors } from "@angular/forms";

export class BaseAuthComponent {
    protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.hasError(error);
    }

    protected passwordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('password');
        const confirm = control.get('confirmPassword');

        if(confirm.value !== '' && password.value !== confirm.value) {
            return {password: true}
        }

        return null;
    }

    protected changePasswordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('newPassword');
        const confirm = control.get('confirmNewPassword');

        if(confirm.value !== '' && password.value !== confirm.value) {
            return {password: true}
        }

        return null;
    }
}