import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasLowerCase || !hasUpperCase) {
      return { passwordCase: true };
    }
    return null;
  };
}
