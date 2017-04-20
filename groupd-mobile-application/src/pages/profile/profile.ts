import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from "../../objects/user";

import { UserData } from "../../providers/user-data";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public backgroundImage = "assets/img/background/orange.png";
  public profileImage = "assets/img/profile/default-profile.jpg";

  private user: User;

  showSkills: boolean = false;

  constructor(public navCtrl: NavController, public UserData: UserData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
  }

  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
    });
  }

  toggleSkills(){
    this.showSkills = !this.showSkills; 
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
