import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UserData } from "../../providers/user-data";
import { ProjectData } from "../../providers/project-data";

import { Proj } from '../../objects/project';
import { User } from '../../objects/user';

import { CreateProjectPage } from "../create-project/create-project";
import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  found: Boolean = true;

  user: User;

  term: String="";

  projects: Proj[] = [];

  refreshing: Boolean = false;

  refresher: any;

  constructor(public navCtrl: NavController, public UserData:UserData, public alertCtrl: AlertController, public ProjectData:ProjectData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
    this.getProjects();
  }
  //refresh data
  doRefresh(refresher) {
      this.projects = [];
      this.found = true;
      this.refreshing = true;
      this.refresher = refresher;
      this.getUser();
      this.getProjects();
  }
  //navigate to create project page
  newProject(){
    this.navCtrl.setRoot(CreateProjectPage);
  }
  //navigate to project page with selected project as a parameter
  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  //refresh current user
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      this.term=user.username;
      //always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                //user found
                  this.user = data;
                  this.UserData.setCurrentUser(this.user);
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
    });
  }
  //get all projects, show 404 if not found
  getProjects(){
    this.ProjectData.getAllProjects().subscribe(projects => {
      this.projects = projects;
    },
    err => {
      console.log("Unsuccessful!" + err);
      this.found = false;
    });
    if(this.refreshing==true){
          this.refresher.complete();
        }
  }
  //pull down latest v of user doc, in the case of changes, 
  //add or remove selected project id from user favourites
  addFavourite(p: Proj){
    console.log("In add Fav");
    this.UserData.getUser(this.user.username.toString()).subscribe(data=> {
      this.user = data;
      if(this.user.bookmarks.indexOf(p.projectId)>-1){
        this.UserData.setCurrentUser(this.user);
            let alert = this.alertCtrl.create({
              title: 'Whoa, hold up',
              subTitle: 'Are you sure you want to remove this project?',
              buttons: [
              {
                text: 'Close',
                role: 'cancel',
                handler: data => {}
              },
              {
                text: 'Remove',
                handler: data => {
                  this.user.bookmarks.splice(this.user.bookmarks.indexOf(p.projectId),1);
                  this.UserData.updateUser(this.user).subscribe(data=>{
                      this.user = data;
                      this.UserData.setCurrentUser(this.user);
                    },
                    err => {
                      console.log("Unsuccessful!" + err);
                      this.showAlert("Whoops","Looks like something went wrong!");
                    });
                  }
                }
              ]
            });
            alert.present();
      }else{
        this.user.bookmarks.push(p.projectId);
        this.UserData.setCurrentUser(this.user);
        
        this.UserData.updateUser(this.user).subscribe(data=>{
          this.user = data;
          this.UserData.setCurrentUser(this.user);
          this.showAlert("Success!", p.projectName + " was added to your favourites.");
        },
        err => {
          console.log("Unsuccessful!" + err);
          this.showAlert("Whoops","Looks like something went wrong!");
        });
      }
    },
    err => {
      console.log("Unsuccessful!" + err);
      this.showAlert("Whoops","Looks like something went wrong!");
    });
  }
  //simple alert template
  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
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
