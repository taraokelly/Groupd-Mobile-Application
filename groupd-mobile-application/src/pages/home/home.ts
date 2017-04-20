import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from "../../providers/user-data";

import { User } from '../../objects/user';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;

  constructor(public navCtrl: NavController, public UserData:UserData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
    });
  }

 //reset user object
  setUserNull(){
    this.user = {
        email: null,
        username: null,
        password: null,
        firstName: null,
        surname: null,
        address: null,
        skills: [],
        bio: null,
        occupation: null,
        ratings: {
          rating: 
            {
              sum_of_rates: null,
              rate_count: null
            },
          ratedby: [
            {
              username: null,
              rate: null
            }
          ]
        },
        bookmarks: [],
        projects: []
      }
  }

}
