/* Adapted from http://stackoverflow.com/questions/39238262/angular-2-email-validator && http://www.w3resource.com/javascript/form/email-validation.php */
import {FormControl} from '@angular/forms';

export class EmailValidator {

   static isValidMailFormat(control: FormControl){
        let email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email_regexp.test(control.value)) {
            return { "Please provide a valid email": true };
        }

        return null;
    }

}