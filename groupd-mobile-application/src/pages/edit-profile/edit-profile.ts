import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UserData } from "../../providers/user-data";
import { User } from "../../objects/user";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { EmailValidator } from '../../validators/email-validator';
import { NoSpaceValidator } from '../../validators/no-space-validator';
import { ContainsCharacterValidator } from '../../validators/contains-character-validator';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  private userForm : FormGroup;

  user: User;

  found: Boolean = false;

  skill: string = "";

  constructor(public navCtrl: NavController, public UserData:UserData, public navParams: NavParams, public alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.setUserNull();
    this.getUser();
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), NoSpaceValidator.hasNoSpaces])],
      firstName: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      surname: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      occupation: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])]
    });
  }

   getUser() {
     console.log("In get User");
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      // Always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                // User found
                this.user = data;
                // Set inpt boxes equal to the current value
                this.userForm.controls['email'].setValue(this.user.email);
                this.userForm.controls['password'].setValue(this.user.password);
                this.userForm.controls['firstName'].setValue(this.user.firstName);
                this.userForm.controls['surname'].setValue(this.user.surname);
                this.userForm.controls['occupation'].setValue(this.user.occupation);
                console.log("In get User - user found");
                this.found = true;
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
    });
  }
  saveChanges(){
    let alert = this.alertCtrl.create({
      title: 'Just checking',
      subTitle: 'Are you want to save these changes?',
      buttons: [
      {
        text: 'Close',
        role: 'cancel',
        handler: data => {}
      },
      {
        text: 'Save',
        handler: data => {
            this.save();
          }
        }
      ]
    });
    alert.present();
  }
  save(){
    //prepare data to be sent to server
    this.user.email=this.userForm.value.email.replace(/^\s+|\s+$/g, "");
    this.user.firstName=this.userForm.value.firstName.replace(/^\s+|\s+$/g, "");
    this.user.surname=this.userForm.value.surname.replace(/^\s+|\s+$/g, "");
    this.user.occupation=this.userForm.value.occupation.replace(/^\s+|\s+$/g, "");
    //password doesn't need to be trimmed, no spaces can be add to it
    this.user.password=this.userForm.value.password;
    this.UserData.updateUser(this.user).subscribe(
      data =>{
        if(data.hasOwnProperty('message')){
          //user wasn't found
          this.showAlert("Whoops","Looks like something went wrong!");
        }else{
          //Successful
          //Save user to storage and trigger event to alert any the app page of the changes
          this.UserData.setCurrentUser(data);
          this.showAlert("Success","Your profile has been updated!");
        }
      },
      err => this.showAlert("Whoops","Looks like something went wrong!"),
      () => console.log("Finished")
    );
  }
  delete(){
    this.UserData.deleteUser(this.user.username.toString()).subscribe(
      data =>{
        if(data.hasOwnProperty('message')){
          this.showAlert("Success","Your profile has been updated!");
        }
      },
      err => this.showAlert("Whoops","Looks like something went wrong!"),
      () => console.log("Finished")
    );
  }
  deleteAccount(){
    let alert = this.alertCtrl.create({
      title: 'Whoa, hold up',
      subTitle: 'Are you want to delete this account?',
      buttons: [
      {
        text: 'Close',
        role: 'cancel',
        handler: data => {}
      },
      {
        text: 'Delete',
        handler: data => {
            this.delete();
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
  deleteSkill(i){
    this.user.skills.splice(i, 1);
  }
  addSkill(){
      if(this.skill == null || this.skill ==""){
        console.log("Null String");
      }
      else if(this.skill.trim().length==0){
         console.log("String Full of Spaces");
         this.skill=null;
      }else if(!this.user.skills.indexOf(this.skill)){
         this.skill=null;
      }
      else{
      this.user.skills.push(this.skill.replace(/^\s+|\s+$/g, ""));
      this.skill=null;
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
