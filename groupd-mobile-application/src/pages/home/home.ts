import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from "../../providers/user-data";

import { User } from '../../objects/user';

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

  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      //this.UserData.setCurrentUser(user);
      console.log("Profile User:" + user);
      this.UserData.setCurrentUser(user);
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
