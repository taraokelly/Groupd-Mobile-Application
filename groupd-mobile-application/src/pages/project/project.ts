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

  //selectedSegment: string;
  hasTags: Boolean = true;

  hasMembers: Boolean = true;

  found: Boolean;

  user: User;

  project: Proj;

  projectSelected: String;

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public navParams: NavParams) {
    this.setProjectNull();
    this.getUser();
    //this.getProject();
    //this.selectedSegment = 'project';
  }
  /* onSegmentChanged(segmentButton) {
    this.selectedSegment=segmentButton.value;
    
  }*/
   getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      //JSON.parse
      if(this.navParams.get('projectSelected')!=null||this.navParams.get('projectSelected')!=undefined){
        this.project= JSON.parse(this.navParams.get('projectSelected'));
        if(this.project.tags.length <1){
          this.hasTags = false;
          console.log("Tags: In false");
        }
        if(this.project.projectMembers.length<1){
          this.hasMembers =false;
          console.log("Members: In false");
        }
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