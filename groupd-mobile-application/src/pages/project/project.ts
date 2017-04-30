import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ProjectData } from "../../providers/project-data";
import { UserData } from "../../providers/user-data";

import { Comment } from '../../objects/project';
import { Proj } from '../../objects/project';
import { User } from "../../objects/user";

import { ProfilePage } from "../profile/profile";
import { EditProjectPage } from "../edit-project/edit-project";

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {

  comObj: Comment;

  comment: string = "";

  pos: any = 0;

  isCreator: Boolean = false;

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

  refreshing: Boolean = false;

  refresher: any;

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public alertCtrl: AlertController, public navParams: NavParams) {
    this.setProjectNull();
    this.setCreatorNull();
    this.setCommentNull();
    this.getUser();
    this.getProject();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    //setTimeout(() => {
      this.refreshing = true;
      this.refresher = refresher;
      this.setProjectNull();
      this.setCreatorNull();
      this.setCommentNull();
      this.getUser();
      this.getProject();
    //}, 2000);
  }
  toggleMessages(){
  this.showMessages = !this.showMessages; 
}
  addFavourite(){
    this.showAlert("Success", "The project "+ this.project.projectName + " has been add to your bookmarks!");
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
              if(data.hasOwnProperty('message')){
                //user not found
                this.found=false;
              }else{
                //user found           
                this.creator=data;
                console.log("creator");
                this.choosenPicture= this.directory + this.creator.gender + ".jpg";
                this.found = true;
                if(this.user.username===this.creator.username){
                  this.isCreator = true;
                }
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
        if(this.refreshing==true){
          this.refresher.complete();
        }
    }
    goToProfile(m){
      this.navCtrl.setRoot(ProfilePage,{
        param1: m
      });
    }
  getProject(){
      //JSON.parse
      if(this.navParams.get('projectSelected')!=null||this.navParams.get('projectSelected')!=undefined){
        //reload in the case of changes
        this.ProjectData.getProject(this.navParams.get('projectSelected')).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                  //user found           
                  this.project=data;
                  if(this.project.tags.length <1){
                    this.hasTags = false;
                  }
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
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      }
      else{
        this.found=false;
      }
  }
  addComment(){
    if(this.comment == null || this.comment ==""){
        console.log("Null String");
      }
      else if(this.comment.trim().length==0){
         console.log("String Full of Spaces");
         this.comment=null;
      }else{
        this.ProjectData.getProject(this.project.projectId.toString()).subscribe(
          data=>{
                if(!data.hasOwnProperty('message')){
                      //user found           
                      this.project=data;
                      this.comObj.username = this.user.username;
                      this.comObj.comment = this.comment.replace(/^\s+|\s+$/g, "");
                      this.comObj.time= new Date();
                      this.project.comments.push(this.comObj);
                      this.comment=null;
                      this.ProjectData.updateProject(this.project).subscribe(
                        data =>{
                          this.setCommentNull();
                          if(data.hasOwnProperty('message')){
                            //user wasn't found
                            this.showAlert("Whoops","Looks like something went wrong!");
                          }else{
                            //Successful
                            //Save user to storage and trigger event to alert any the app page of the changes
                            this.showAlert("Success","Your project has been updated!");
                          }
                        },
                        err => this.showAlert("Whoops","Looks like something went wrong!"),
                        () => console.log("Finished")
                      );
                      if(this.project.tags.length <1){
                        this.hasTags = false;
                      }
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
            

          },
          err => console.log("Unsuccessful!" + err),
          () => console.log("Finished")
        );
      }
  }

  creatorProfile(){
    this.navCtrl.push( ProfilePage, {
        param1: this.creator.username
    });
  }
  editProject(){
    console.log("In edit project");
    this.navCtrl.push( EditProjectPage, {
        projectSelected : this.project.projectId
    });
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
      comments: [{
        username: null,
        comment: null,
        time: null 
      }],
      tags: [],
      time: null
    }
  }
  //reset comment object
  setCommentNull(){
    this.comObj ={
      username: null,
      comment: null,
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
          ratedby: []
        },
        bookmarks: [],
        projects: []
      }
  }
}