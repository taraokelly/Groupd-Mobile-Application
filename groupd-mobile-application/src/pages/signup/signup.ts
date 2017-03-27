import { ViewChild, Component } from '@angular/core';
import { Slides, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild(Slides) slides: Slides;

  user: User;

  skill: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setUserNull(this.user);
  }

  goToSlide(index) {
    this.slides.slideTo(index, 500);
  }
 /* addSkill(skill){
    this.user.skills.push(skill);
  }*/
  addSkill(){
    this.user.skills.push(this.skill);
    this.skill=null;
  }
  deleteSkill(i){
  this.user.skills.splice(i, 1);
  }
  addUser(){
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
