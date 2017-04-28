import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from "../../objects/user";

import { UserData } from "../../providers/user-data";
import { ProjectData } from "../../providers/project-data";

import { EditProfilePage } from "../edit-profile/edit-profile";
import { Proj } from "../../objects/project";
import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  found: Boolean = false;

  public backgroundImage = "assets/img/background/orange.png";

  private user: User;

  private currUser: User;

  username: string;

  currentUser: boolean = false;

  showSkills:Boolean = false;

  directory: string = "assets/img/profile/";

  choosenPicture: string = "";

   projects: Proj[] = []
   
   proj: Proj[] = [];

  constructor(public navCtrl: NavController, public UserData: UserData,public ProjectData: ProjectData, public navParams: NavParams) {
    this.username = this.navParams.get('param1'); 
    this.setUserNull();
    this.getUser();
    this.getCurrentUser();
    this.getProjects();
  }
  
  getProjects(){
    this.ProjectData.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  getCurrentUser(){
    this.UserData.getCurrentUser().then((user) => {
      this.currUser = user;
      // Username can never change, therefore there is no point changing it
      if(user.username===this.username){
        this.currentUser = true;
      }
      else{
        this.currentUser = false;
      }
      // always reload user in the case of changes
      this.UserData.getUser(user.username.toString()).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
              }else{
                //user found
                  this.currUser = data;
                  this.choosenPicture= this.directory + this.user.gender + ".jpg";
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
    });

  }

  getUser() {
      this.UserData.getUser(this.username).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
              }else{
                //user found
                  this.found = true;
                  this.user = data;
                  this.choosenPicture= this.directory + this.user.gender + ".jpg";
                  
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
    }
  

  toggleSkills(){
    this.showSkills= !this.showSkills;
  }

  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage);
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
