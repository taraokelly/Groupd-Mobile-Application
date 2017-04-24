import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContainsCharacterValidator } from '../../validators/contains-character-validator';

import { ProjectData } from "../../providers/project-data";
import { UserData } from "../../providers/user-data";

import { Proj } from '../../objects/project';
import { User } from "../../objects/user";

@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html'
})
export class CreateProjectPage {

  user:User;

  member: String;

  project: Proj;

  private projectForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ProjectData: ProjectData, public UserData: UserData,public alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.setProjectNull();
    this.setUserNull();
    this.getUser();
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
    });
  }
  addMember(){
    if(this.member == null || this.member ==""){
        console.log("Null String");
      }
      else if(this.member.trim().length==0){
         console.log("String Full of Spaces");
         this.member=null;
      }
      else{
      this.project.projectMembers.push(this.member.replace(/^\s+|\s+$/g, ""));
      this.member=null;
    }
  }
  deleteMember(i){
    this.project.projectMembers.splice(i, 1);
  }
  addProject(){
    this.project.projectName=this.projectForm.value.name.replace(/^\s+|\s+$/g, "");
    this.project.projectThumb=this.projectForm.value.thumb.replace(/^\s+|\s+$/g, "");
    this.project.projectDesc=this.projectForm.value.desc.replace(/^\s+|\s+$/g, "");
    this.project.maxMembers=this.projectForm.value.maxMembers.replace(/^\s+|\s+$/g, "");
    this.project.projectCreator=this.user.username;
    this.project.time = new Date();
    console.log(this.project);
    this.ProjectData.addProject(JSON.stringify(this.project))
      .subscribe(
        data => {
            if(data.message === 'Project Added'){

              this.setProjectNull();    
              this.projectForm.reset();
              this.successfulAlert();
            }else{

              this.showAlert("Unsuccessful", "Looks like something went wrong");
            }
        },
        err => this.showAlert("Unsuccessful", "Looks like something went wrong"),
        () => console.log("Finished")
      ); 
  }
    //result alerts
  successfulAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Proceed to the project page?',
      buttons: [
      {
        text: 'No thanks',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
            console.log('Login clicked');
            //this.navCtrl.setRoot(LoginPage);
            //go to project page
          }
        }
      ]
    });
    alert.present();
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