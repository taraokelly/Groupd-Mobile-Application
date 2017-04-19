import { ViewChild, Component } from '@angular/core';
import { Slides, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { EmailValidator } from '../../validators/email-validator';
import { NoSpaceValidator } from '../../validators/no-space-validator';
import { ContainsCharacterValidator } from '../../validators/contains-character-validator';
//import { UsernameAvailabiltyValidator } from '../../validators/username-availablity-validator';

import { UserData } from "../../providers/user-data";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild(Slides) slides: Slides;

  user: User;

  skill: string;

  private userForm : FormGroup;

  private userDetailsForm : FormGroup;


  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public UserData: UserData, private formBuilder: FormBuilder) {
    this.setUserNull(this.user);
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValidMailFormat])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), NoSpaceValidator.hasNoSpaces])/*, UsernameAvailabiltyValidator.checkAvailability*/],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), NoSpaceValidator.hasNoSpaces])]

    });
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      surname: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      occupation: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])]
    });
  }

  goToSlide(index) {
    this.slides.slideTo(index, 500);
  }
  addSkill(){
      if(this.skill == null || this.skill ==""){
        console.log("Null String");
      }
      else if(this.skill.trim().length==0){
         console.log("String Full of Spaces");
         this.skill=null;
      }
      else{
      this.user.skills.push(this.skill.replace(/^\s+|\s+$/g, ""));
      this.skill=null;
    }
  }
  deleteSkill(i){
    this.user.skills.splice(i, 1);
  }
  addUser(){

    //prepare data to be sent to server
    this.user.email=this.userForm.value.email.replace(/^\s+|\s+$/g, "");
    //username and password don't need to be trimmed, no spaces can be add to them
    this.user.username=this.userForm.value.username;
    this.user.password=this.userForm.value.password;
    this.user.firstName=this.userDetailsForm.value.firstName.replace(/^\s+|\s+$/g, "");
    this.user.surname=this.userDetailsForm.value.surname.replace(/^\s+|\s+$/g, "");
    this.user.occupation=this.userDetailsForm.value.occupation.replace(/^\s+|\s+$/g, "");
    console.log(this.user);

    //add user
    this.UserData.addUser(JSON.stringify(this.user))
      .subscribe(
        data => {
            if(data.message === 'Saved'){

              this.setUserNull(this.user);    
              this.userDetailsForm.reset();
              this.userForm.reset();
              //alert(data.message);
              this.successfulAlert();
            }else{

              //alert(data.message);
              this.unsuccessfulAlert();
              this.goToSlide(0);
            }
        },
        err => alert("Unsuccessful!" + err),
        () => console.log("Finished")
      );

  }

  successfulAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Proceed to log in page?',
      buttons: [
      {
        text: 'Close',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
            console.log('Login clicked');
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
  unsuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title: 'Whoops!',
      subTitle: 'Looks like that username is taken!',
      buttons: ['Okay']
    });
    alert.present();
  }
  
  setUserNull(user:User){
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

interface User {
  email: String;
  username: String;
  password: String;
  firstName: String;
  surname: String;
  address: String;
  skills: String[];
  bio: String;
  occupation: String;
  ratings: Ratings,
	bookmarks: String[];
	projects: String[];
}

interface Ratings{
		rating: Rating,
		ratedby: [ Ratedby ]
	}

interface Rating{
    	sum_of_rates: number,
			rate_count: number
  }

interface Ratedby{
				username: String,
				rate: number 
			}