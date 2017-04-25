import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProjectData } from "../../providers/project-data";
import { UserData } from "../../providers/user-data";

import { Proj } from '../../objects/project';
import { User } from "../../objects/user";

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  found: Boolean;

  user: User;

  project: Proj;

  projectSelected: String;

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public navParams: NavParams) {
    this.getUser();
  }

  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      //JSON.parse
      if(this.navParams.get('projectSelected')!=null||this.navParams.get('projectSelected')!=undefined){
        this.project= JSON.parse(this.navParams.get('projectSelected'));
        this.found=true;
      }
      else{
        this.found=false;
      }
      //always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              //console.log(data);
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
  //reset project object
  setProjectNull(){
    this.project ={
      projectId: null,
      projectName: null,
      projectThumb: null,
      projectCreator: null,
      projectMembers: [],
      maxMembers: null,
      projectDesc: null,
      comments: null,
      tags: [],
      time: null
    }
  }
}
