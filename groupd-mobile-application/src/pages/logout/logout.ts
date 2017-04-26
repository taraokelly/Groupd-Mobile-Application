import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';


import { UserData } from "../../providers/user-data";

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public UserData:UserData, public events:Events, public navParams: NavParams) {}

  logout(){
    this.UserData.logout();
  }

}
