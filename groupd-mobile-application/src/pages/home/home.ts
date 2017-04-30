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
  doRefresh(refresher) {
      this.projects = [];
      this.found = true;
      this.refreshing = true;
      this.refresher = refresher;
      this.getUser();
      this.getProjects();
  }
  newProject(){
    this.navCtrl.setRoot(CreateProjectPage);
  }
  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      this.term=user.username;
      //always reload user in the case of changes
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

  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
  }
  deleteProject() {
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
          }
        }
      ]
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
