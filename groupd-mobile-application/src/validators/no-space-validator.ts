import {FormControl} from '@angular/forms';

export class NoSpaceValidator {

   static hasNoSpaces(control: FormControl) {

        // Check for white space
        if (/\s/.test(control.value)) {
            return { "Please provide a valid username": true };
        }

        return null;
    }
}