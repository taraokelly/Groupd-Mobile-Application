//Adapted from https://github.com/driftyco/ionic-conference-app

import { Component, ViewChild } from '@angular/core';
import {  MenuController, NavController, Slides  } from 'ionic-angular';

import { UserData } from "../../providers/user-data";

import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(public navCtrl: NavController, public UserData: UserData, public menu: MenuController) { }

  startApp() {
    this.UserData.hasLoggedIn().then((hasLoggedIn)=>{
      if(hasLoggedIn){this.navCtrl.setRoot(HomePage);}
      else{this.navCtrl.setRoot(LoginPage);}
    });
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

	ionViewWillEnter() {
		this.slides.update();
	}

  //toggle logged in/out menu
   enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    this.UserData.hasLoggedIn().then((hasLoggedIn)=>{
      this.enableMenu(hasLoggedIn);
    });
  }
}
