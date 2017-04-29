import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from "ionic-angular/index";

import { Ratedby } from "../../objects/user";

import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-raters-model',
  templateUrl: 'raters-model.html'
})
export class RatersModelPage {

  raters: Ratedby[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
    this.raters = JSON.parse(this.navParams.get('raters'));
    console.log(this.raters);
  }
  closeModal(){
    console.log("close modal called");
    this.viewCtrl.dismiss();
  }
  viewProfile(r : Ratedby){
    this.navCtrl.push(ProfilePage, {
        param1: r.username
    });
  }
}
