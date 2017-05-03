import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from "../../providers/user-data";
import { ProjectData } from "../../providers/project-data";

import { Proj } from '../../objects/project';
import { User } from '../../objects/user';

import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-search-projects',
  templateUrl: 'search-projects.html'
})
export class SearchProjectsPage {

  found: Boolean = true;

  user: User;

  query: string = "";

  projects: Proj[];

  refreshing: Boolean = false;

  refresher: any;

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
    this.getProjects();
  }

  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  //refresh data
  doRefresh(refresher) {
    setTimeout(() => {
      this.found = true;
      this.projects = [];
      this.refreshing = true;
      this.refresher = refresher;
      this.setUserNull();
      this.getUser();
      this.getProjects();
      }, 500);
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
                this.UserData.setCurrentUser(this.user);
              }
            },
            err => {
                console.log("Unsuccessful!" + err);
                this.found = false;
            },
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
