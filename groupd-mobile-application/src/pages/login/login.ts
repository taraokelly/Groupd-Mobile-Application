import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
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
  public backgroundImage = "assets/img/background/orange.png";

  constructor(private navCtrl: NavController, public navParams: NavParams, public UserData: UserData, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
    this.setLoginFormNull();
   }

  login() {
    //Check if login credentials are null or only spaces before http call
    if(this.loginForm.username!=null || this.loginForm.password!=null ){

      if (this.loginForm.username.trim().length != 0 || this.loginForm.password.trim().length != 0){

        this.UserData.getUser(this.loginForm.username).subscribe(
            data => {
              //console.log(data);
              if(data.hasOwnProperty('message')){
                //user not found
                this.showAlert('User not found!', 'Are you using the correct username?');
              }else{
                //user found
                //compare data.username && .password with loginForm
                if(this.loginForm.password === data.password){
                  //valid password - relocate
                  //this.showAlert('Logged in!', 'Thanks for logging in.');
                  //this.events.publish('user:login');
                  //this.navCtrl.setRoot(SignupPage);
                  this.UserData.login(data);
                }else{
                  //invalid password
                  this.showAlert('Invalid password', 'Are you using the correct username?');
                }
              }
            },
            err => this.showAlert("Unsuccessful!", "Error" + err),
            () => console.log("Finished")
        );
      }
    }
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
