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
  
  alertCtrl: any;

  pos: any = 0;

  //selectedSegment: string;
  hasTags: Boolean = true;

  showMessages: Boolean =false;

  hasMembers: Boolean = true;

  hasComments: Boolean = true;

  found: Boolean;

  user: User;

  creator: User;

  project: Proj;

  projectSelected: String;
  
  directory: string = "assets/img/profile/";

  choosenPicture: string = "";

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public navParams: NavParams) {
    this.setProjectNull();
    this.setCreatorNull();
    this.getUser();
    this.getProject();
    //this.getProject();
    //this.selectedSegment = 'project';
  }
  /* onSegmentChanged(segmentButton) {
    this.selectedSegment=segmentButton.value;
    
  }*/
  toggleMessages(){
  this.showMessages = !this.showMessages; 
}
  addFavourite(){
    this.showAlert("Unsuccessful", "The project "+ this.project.projectName + " has been add to your bookmarks!");
  }
  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
    }
    getCreator(){
      this.UserData.getUser(this.project.projectCreator.toString()).subscribe(
            data => {
              //console.log(data);
              if(data.hasOwnProperty('message')){
                //user not found
                this.found=false;
              }else{
                //user found           
                this.creator=data;
                console.log("creator");
                this.choosenPicture= this.directory + this.creator.gender + ".jpg";
                this.found = true;
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
    }
  getProject(){
      //JSON.parse
      if(this.navParams.get('projectSelected')!=null||this.navParams.get('projectSelected')!=undefined){
        this.project= JSON.parse(this.navParams.get('projectSelected'));
        //reload in the case of changes
        this.ProjectData.getProject(this.project.projectId.toString()).subscribe(
            data => {
              //console.log(data);
              if(!data.hasOwnProperty('message')){
                //user found           
                this.project=data;
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
        if(this.project.tags.length <1){
          this.hasTags = false;
        }
        /*if(this.project.comments.length <1){
          this.hasComments = false;
          console.log("Tags: In false");
        }*/
        this.pos = this.project.maxMembers;
        if(this.project.projectMembers.length<this.project.maxMembers){
          this.pos -= this.project.projectMembers.length;
        }
        else{
          this.pos = 0;
        }
        if(this.project.projectMembers.length<1){
          this.hasMembers =false;
        }
        //get project creator
        this.getCreator();
      }
      else{
        this.found=false;
      }
  }
   getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
  
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
  //reset creator object
  setCreatorNull(){
    this.creator = {
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