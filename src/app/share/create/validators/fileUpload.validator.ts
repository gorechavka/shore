import { AbstractControl } from '@angular/forms';

export function FileUploadValidator() {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const empty = control.value.length === 0 || control.value === 0;
    return empty ? { isEmpty: true } : null;
  };
}
