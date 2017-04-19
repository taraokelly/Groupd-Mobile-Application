import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = "assets/img/background/orange.png";

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) { }

  login() {
    let loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      let alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();

  }

  goToSignup() {
    // this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
