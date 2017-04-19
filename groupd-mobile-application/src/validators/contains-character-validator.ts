import {FormControl} from '@angular/forms';

export class ContainsCharacterValidator {

   static hasCharacter(control: FormControl) {

    //check for null or undefined so the reset() will not case error by trying to trim a null or undefined value
    if(control.value!=null || control.value!=undefined){
        // Check for character in string 
        if (control.value.trim().length == 0) {
            return { "Contains character": true };
        }
    }
        return null;
    }
}