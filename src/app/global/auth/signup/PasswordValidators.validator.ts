import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

export class PasswordValidators extends Validators {
  public static hasCapital(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = !/[A-Z]/.test(control.value);

      return invalid ? { noCapital: { value: control.value } } : null;
    };
  }

  public static hasLowercase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = !/[a-z]/.test(control.value);

      return invalid ? { noLowercase: { value: control.value } } : null;
    };
  }

  public static hasNum(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = !/[0-9]/.test(control.value);

      return invalid ? { noNum: { value: control.value } } : null;
    };
  }

  public static hasSpecial(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = !/[_!#\+\-$]/.test(control.value);

      return invalid ? { noSpecial: { value: control.value } } : null;
    };
  }

  public static equal(password: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const invalid = control.value !== password.value;

      return invalid ? { notEqual: password } : null;
    };
  }
}
