import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordSpecialValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordRegex = /^(?=.*[!@#$%^&*])/; // Regex for at least one special character
    const valid = passwordRegex.test(control.value);
    return valid ? null : { passwordSpecial: true };
  };
}
