import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild(Slides) slides: Slides;


  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      email: "",
      username: "",
      password: "",
      firstname: "",
      surname: "",
      job: "",
      bio: ""
    }
  }

 goToSlide(index) {
    this.slides.slideTo(index, 500);
  }

  addUser(){
  /* this.ContactData.addUserProvider(JSON.stringify(this.user))
      .subscribe(
        data => alert("Successful!"),
        err => alert("Unsuccessful!" + err),
        () => console.log("Finished")
      );*/
    this.user = {
      email: "",
      username: "",
      password: "",
      firstname: "",
      surname: "",
      job: "",
      bio: ""
    }
  }

}
interface User{
  email: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  job: string;
  bio: string;
}

