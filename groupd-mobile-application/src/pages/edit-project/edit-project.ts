import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContainsCharacterValidator } from '../../validators/contains-character-validator';

import { ProjectData } from "../../providers/project-data";
import { UserData } from "../../providers/user-data";

import { Proj } from '../../objects/project';
import { User } from "../../objects/user";

import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html'
})
export class EditProjectPage {

  found: Boolean = false;

  user: User;

  tag: String;

  member: String;

  project: Proj;

  projectId: string

  private projectForm : FormGroup;

  constructor(public navCtrl: NavController,  public ProjectData: ProjectData, public UserData: UserData, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.setProjectNull();
    this.setUserNull();
    this.getUser();
    this.getProject();
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      thumb: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      desc: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      maxMembers: ['', Validators.compose([Validators.required])] //check int maybe?
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
  getProject(){
      //JSON.parse
      if(this.navParams.get('projectSelected')!=null||this.navParams.get('projectSelected')!=undefined){
        //reload in the case of changes
        this.ProjectData.getProject(this.navParams.get('projectSelected')).subscribe(
            data => {
              //console.log(data);
              if(!data.hasOwnProperty('message')){
                  //project found           
                  this.project=data;
                  if(this.project.projectName!= null || this.project.projectName!= undefined || this.project.projectName!= ""){
                    this.projectForm.controls['name'].setValue(this.project.projectName);
                    }
                  if(this.project.projectThumb!= null || this.project.projectThumb!= undefined || this.project.projectThumb!= ""){
                    this.projectForm.controls['thumb'].setValue(this.project.projectThumb);
                    }
                  if(this.project.projectDesc!= null || this.project.projectDesc!= undefined || this.project.projectDesc!= ""){
                    this.projectForm.controls['desc'].setValue(this.project.projectDesc);
                    }
                  if(this.project.maxMembers!= null || this.project.maxMembers!=undefined  || this.project.projectDesc!= ""){
                    this.projectForm.controls['maxMembers'].setValue(this.project.maxMembers);
                    }
                  console.log(data);
                  this.found=true;
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
  deleteMember(i){
    this.project.projectMembers.splice(i, 1);
  }
  addTag(){
    if(this.tag == null || this.tag ==""){
        console.log("Null String");
      }
      else if(this.tag.trim().length==0){
         console.log("String Full of Spaces");
         this.tag=null;
      }
     else if(!this.project.tags.indexOf(this.tag)){
         this.tag=null;
      }
      else{
      this.project.tags.push(this.tag.replace(/^\s+|\s+$/g, ""));
      this.tag=null;
    }
  }
  addMember(){
    if(this.member == null || this.member ==""){
        console.log("Null String");
      }
      else if(this.member.trim().length==0){
         console.log("String Full of Spaces");
         this.member=null;
      }
     else if(!this.project.projectMembers.indexOf(this.member)){
         this.member=null;
      }
      else{
      this.project.projectMembers.push(this.member.replace(/^\s+|\s+$/g, ""));
      this.member=null;
    }
  }
  deleteTag(i){
    this.project.tags.splice(i, 1);
  }
  viewProject(){
      this.navCtrl.setRoot(ProjectPage, {
          projectSelected: this.projectId
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
