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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public UserData: UserData, public ProjectData: ProjectData) {
    this.getUser();
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
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.getProjects();
      this.UserData.setCurrentUser(user);
    });
  }
  getProjects() {
    this.projects=[];
    for(var i=0;i<this.user.bookmarks.length;i++){
      //this
        //reload in the case of changes
        console.log("Bookmark: " + this.user.bookmarks[i]);
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
        console.log(this.projects);
      }
  }
  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
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
  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
  }
}
