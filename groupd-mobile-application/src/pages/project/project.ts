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

  hasTags: Boolean = true;

  showMessages: Boolean =false;

  hasMembers: Boolean = true;

  hasComments: Boolean = true;

  cFound: Boolean = true;

  found: Boolean = true;

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
    this.getProject();
  }
  //refresh data
  doRefresh(refresher) {

    //setTimeout(() => {
      this.refreshing = true;
      this.refresher = refresher;
      this.found=true;
      this.cFound=true;
      this.setProjectNull();
      this.setCreatorNull();
      this.setCommentNull();
      //this.getUser();
      this.getProject();
    //}, 2000);
  }
  //show/hide messages
  toggleMessages(){
  this.showMessages = !this.showMessages; 
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
    //get creator of project and check if curr user is the creator
    //if the creator is not found(if the creator account has been deleted) don't display the creator
    getCreator(){
      this.UserData.getUser(this.project.projectCreator.toString()).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
                this.cFound=false;
              }else{
                //user found   
                //check if the project creator has the projectId in case
                //a user deletes their account and then another new user takes the same username,
                //which is now available
                if(data.projects.indexOf(this.project.projectId) > -1){       
                  this.creator=data;
                  this.choosenPicture= this.directory + this.creator.gender + ".jpg";
                  if(this.user.username===this.creator.username){
                    this.isCreator = true;
                  }
                }else{
                  this.cFound=false;
                }
              }
            },
            err => {
              console.log("Unsuccessful!" + err);
              this.cFound = false;
            },
            () => console.log("Finished")
        );
        if(this.refreshing==true){
          this.refresher.complete();
        }
    }
    goToProfile(m){
      //the following error handling is done so that
      //if a member deletes their account and another user takes there name,
      //they will not be directed to the new user's page
      
      //pull down member
      this.UserData.getUser(m).subscribe(data=>{
        //check if member has project projectId
        if(data.hasOwnProperty('message')){
          this.showAlert("Sorry","This member has was not found or does not exist anymore");
        }
        else{
          if(data.projects.indexOf(this.project.projectId) > -1){
            this.navCtrl.setRoot(ProfilePage,{
              param1: m
            });
          }else{
            this.showAlert("Sorry","This member has was not found or does not exist anymore");
          }
        }
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
                ///this.getCreator();
                this.getUser();
              }
              else{
                this.found=false;
              }
            },
            err => {
              console.log("Unsuccessful!" + err);
              this.found=false;
          },
            () => console.log("Finished")
        );
      }
      else{
        this.found=false;
      }
  }
  //validate comment, refresh project object, add comment, update user
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
  //go to creator profile
  creatorProfile(){
    this.navCtrl.push( ProfilePage, {
        param1: this.creator.username
    });
  }
  //go to edit project
  editProject(){
    console.log("In edit project");
    this.navCtrl.push( EditProjectPage, {
        projectSelected : this.project.projectId
    });
  }
  //get current user
   getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
  
      //always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
                this.found=false;
              }else{
                //user found
                  this.user = data;
                  this.UserData.setCurrentUser(this.user);
              }
              this.getCreator();
            },
            err => {
              console.log("Unsuccessful!" + err);
              this.found = false;
            },
            () => console.log("Finished")
        );
    });
  }
  //refresh user, add or remove from user, update user
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