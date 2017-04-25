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
    //alert("Received param1: " + this.username)
    this.setUserNull();
    this.getUser();
  }
  
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      // Username can never change, therefore there is no point changing it
      if(user.username===this.username){
        this.currentUser = true;
      }
      else{
        this.currentUser = false;
      }
      // always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
              }else{
                //user found
                  this.user = data;
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
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
