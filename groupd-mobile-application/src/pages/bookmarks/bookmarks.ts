import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ProjectData } from "../../providers/project-data";
import { UserData } from "../../providers/user-data";

import { Proj } from '../../objects/project';
import { User } from "../../objects/user";
import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html'
})
export class BookmarksPage {

  user: User;

  projects: Proj[];

  refreshing: Boolean = false;

  refresher: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserData: UserData, public ProjectData: ProjectData) {
    this.getUser();
  }
  //refresh data
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    //setTimeout(() => {
      this.refreshing = true;
      this.refresher = refresher;
      this.getUser();
    //}, 2000);
  }
  //refresh current user
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
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.getProjects();
      this.UserData.setCurrentUser(user);
    });
  }
  //get all project listed in bookmarks
  getProjects() {
    this.projects=[];
    for(var i=this.user.bookmarks.length-1;i>=0;i--){
        this.ProjectData.getProject(this.user.bookmarks[i].toString()).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                  //project found           
                  this.projects.push(data);     
                  console.log(data);   
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
        if(this.refreshing==true){
          this.refresher.complete();
        }
      }
  }
  //naviagte to project page with selected project as a parameter
  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  //pull down user, then add or remove selected project ID from bookmarks, and update user
   addFavourite(p: Proj){
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
                      this.getProjects();
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
  //alert template
  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
  }
}