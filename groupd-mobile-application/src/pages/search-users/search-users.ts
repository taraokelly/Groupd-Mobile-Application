import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from "../../providers/user-data";

import { User } from '../../objects/user';

import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-search-users',
  templateUrl: 'search-users.html'
})
export class SearchUsersPage {

  found: Boolean = true;

  user: User;

  query: string = "";

  users: User[];

  constructor(public navCtrl: NavController, public UserData:UserData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
    this.getUsers();
  }

  viewProfile(u : User){
    this.navCtrl.push(ProfilePage, {
        param1: u.username
    });
  }
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      //always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                //user found
                this.user = data;
              }
            },
            err => {
                console.log("Unsuccessful!" + err);
                this.found = false;
            },
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
    });
  }

  getUsers(){
    this.UserData.getAllUsers().subscribe(users => {
      this.users = users;
    },
    err => {
      console.log("Unsuccessful!" + err);
      this.found = false;
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
          ratedby: []
        },
        bookmarks: [],
        projects: []
      }
  }
}
