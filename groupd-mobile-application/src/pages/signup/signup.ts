import { ViewChild, Component } from '@angular/core';
import { Slides, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {EmailValidator} from '../../validators/email-validator';
import {NoSpaceValidator} from '../../validators/no-space-validator';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.setUserNull(this.user);
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators. required, EmailValidator.isValidMailFormat])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), NoSpaceValidator.hasNoSpaces])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), NoSpaceValidator.hasNoSpaces])]

    });
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      occupation: ['', Validators.required]
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
      this.user.skills.push(this.skill);
      this.skill=null;
    }
  }
  deleteSkill(i){
    this.user.skills.splice(i, 1);
  }
  addUser(){
    this.user.email=this.userForm.value.email;
    this.user.username=this.userForm.value.username;
    this.user.password=this.userForm.value.password;
    this.user.firstName=this.userDetailsForm.value.firstName;
    this.user.surname=this.userDetailsForm.value.surname;
    this.user.occupation=this.userDetailsForm.value.occupation;
    console.log(this.user);
  /* this.ContactData.addUserProvider(JSON.stringify(this.user))
      .subscribe(
        data => alert("Successful!"),
        err => alert("Unsuccessful!" + err),
        () => console.log("Finished")
      );*/
    this.setUserNull(this.user);
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