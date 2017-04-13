import {FormControl} from '@angular/forms';

export class ContainsCharacterValidator {

   static hasCharacter(control: FormControl) {

        // Check for character in string 
        if (control.value.trim().length == 0) {
            return { "Contains character": true };
        }

        return null;
    }
}