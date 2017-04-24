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
  //public profileImage = "assets/img/profile/Female.jpg";
  public profileImage = "assets/img/profile/Female.jpg";

  private user: User;

  username:any;

  currentUser: boolean = false;

  constructor(public navCtrl: NavController, public UserData: UserData, public navParams: NavParams) {
    this.username = this.navParams.get('param1'); 
    alert("Received param1: " + this.username)
    this.setUserNull();
    this.getUser();
  }
  
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      
      if(user.username===this.username){
        this.currentUser = true;
      }
      else{
        this.currentUser = false;
      }
    });
  }

  toggleSkills(){
    if(this.currentUser=== true){
      alert("Your Profile");
    }
    else{
      alert("Not Your Profile");
    }
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
