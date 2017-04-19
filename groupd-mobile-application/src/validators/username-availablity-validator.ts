/*import {FormControl} from '@angular/forms';

import { UserData } from "../providers/user-data";

import {Http} from '@angular/http';
//import {Injector} from '@angular/core'
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
/*

interface IUsernameEmailValidator {
}

function checkUser(control: FormControl, source: string) : Observable<IUsernameEmailValidator> {

 htpp : Http;

  // Return an observable with null if the
  // username or email doesn't yet exist, or
  // an objet with the rejetion reason if they do
  return new Observable((obs: any) => {
    control
      .valueChanges
      .debounceTime(400)
      .flatMap(value => http.get('http://127.0.0.1:8080/api/users' + "/" + control))
      .subscribe(
        data => {
            if(data.hasOwnProperty('message')){
                obs.next(null);
                obs.complete();
            }
            else{
                obs.next({ ["Name taken"]: true });
                obs.complete();
            }
        },
        error => {
          let message = error.json().message;
         /* let reason;
          if (message === 'Username taken') {
            reason = 'usernameTaken';
          }
          if (message === 'Email taken') {
            reason = 'emailTaken';
          }*/
   /*       obs.next({ [message]: true });
          obs.complete();
        }
    );
  });
}

export class UsernameAvailabiltyValidator {

   // static userData : UserData ;

    
  constructor() {
      //UsernameAvailabiltyValidator.userData = userData;
  }



    static checkAvailability(control: FormControl) {

        return checkUser(control, 'username');
  
      /*  return UsernameAvailabiltyValidator.userData.checkUsername(control.value)
        .subscribe(data => { 
            if(data.hasOwnProperty('message')){
                Promise.resolve({ invalid: true });
            }
        } );*/

 /*   static checkAvailability(control: FormControl, userData: UserData) {
        return new Promise(resolve => {
 
      //Fake a slow response from server
 
   
        userData.checkUsername(control.value).subscribe(data => {
            if(data.hasOwnProperty('message')){
                resolve({
                    "username taken": true
                });
            } else{
                resolve(null);
            }
         });
    });  
 */       

/*      setTimeout(() => {
        if(control.value.toLowerCase() === "adam"){
 
          resolve({
            "username taken": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });*/

      /*   
        UserData.checkUsername("").subscribe(data => {
            if(data.hasOwnProperty('message')){

        }
    });*/   
        
     /*   
        UserValidator.userData.checkUsername("").subscribe(data => {
            if(data.hasOwnProperty('message')){

        }
    });*/
        
       // }

 /*       checkServer(user: string){
            this.userData.checkUsername("").subscribe(data => {
                if(data.hasOwnProperty('message')){
                    console.log(data.message);
                }else{
                    console.log("Username valid");
                }
             });
        }*/
  //  }