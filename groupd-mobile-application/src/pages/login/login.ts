import { Component } from '@angular/core';
import { NavController/*, NavParams*/, LoadingController, AlertController, App } from 'ionic-angular';
import { SignupPage } from "../signup/signup";

import { UserData } from "../../providers/user-data";

import { LoginForm } from '../../objects/login-form';
//import { User } from '../../objects/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  private loginForm: LoginForm;
  private backgroundImage = "assets/img/background/orange.png";

  constructor(private navCtrl: NavController, public UserData: UserData, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
    this.setLoginFormNull();
   }

  login() {
    this.UserData.getUser(this.loginForm.username).subscribe(
        data => {
          if(data.hasOwnProperty('message')){
            //user not found
            this.showAlert('User not found!', 'Are you using the correct username?');
          }else{
            //user found
            //compare data.username && .password with loginForm
            if(this.loginForm.password === data.password){
              //valid password - relocate
              this.showAlert('Logged in!', 'Thanks for logging in.');
            }else{
              //invalid password
              this.showAlert('Invalid password', 'Are you using the correct username?');
            }
          }
        },
        err => alert("Unsuccessful!" + err),
        () => console.log("Finished")
    );
  }

  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
    }

  setLoginFormNull(){
    this.loginForm = {
      username: null,
      password: null
    }
  }

  goToSignup() {
    this.navCtrl.setRoot(SignupPage);
  }
}
