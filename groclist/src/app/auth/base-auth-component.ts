import { AbstractControl, ValidationErrors } from '@angular/forms';

export class BaseAuthComponent {

    public passwordTooShort = false;
    public passwordRequiresNonAlphanumeric = false;
    public passwordRequiresDigit = false;
    public passwordRequiresUpper = false;

    public isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.value != '' && control.hasError(error);
    }

    public passwordValidator(control: AbstractControl): ValidationErrors {
        // assumes that the form has a 'password' and 'confirmPassword' controls
        const password = control.get('password');
        const confirm = control.get('confirmPassword');

        if (confirm.value !== '' && password.value !== confirm.value) {
            return { password: true };
        }

        return null;
    }

    public hasPasswordError(error: any): void {
        const actualError = error.error;

        this.passwordTooShort = false;
        this.passwordRequiresNonAlphanumeric = false;
        this.passwordRequiresDigit = false;
        this.passwordRequiresUpper = false;

        if (actualError.PasswordTooShort) {
          this.passwordTooShort = true;
        }

        if (actualError.PasswordRequiresNonAlphanumeric) {
          this.passwordRequiresNonAlphanumeric = true;
        }

        if (actualError.PasswordRequiresDigit) {
          this.passwordRequiresDigit = true;
        }

        if (actualError.PasswordRequiresUpper) {
          this.passwordRequiresUpper = true;
        }
      }
}
