import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { User } from "../../objects/user";

import { UserData } from "../../providers/user-data";
import { ProjectData } from "../../providers/project-data";

import { EditProfilePage } from "../edit-profile/edit-profile";
import { RatersModelPage } from "../raters-model/raters-model";

import { Proj } from "../../objects/project";
import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  found: Boolean = false;

  public backgroundImage = "assets/img/background/orange.png";

  private user: User;

  private currUser: User;

  username: string;

  currentUser: boolean = false;

  showSkills:Boolean = false;

  directory: string = "assets/img/profile/";

  choosenPicture: string = "";

   projects: Proj[] = []
   
   proj: Proj[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public UserData: UserData,public ProjectData: ProjectData, public navParams: NavParams) {
    this.username = this.navParams.get('param1'); 
    this.setUserNull();
    this.getUser();
    this.getCurrentUser();
    this.getProjects();
  }
  
  getProjects(){
    this.ProjectData.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  getCurrentUser(){
    this.UserData.getCurrentUser().then((user) => {
      this.currUser = user;
      // Username can never change, therefore there is no point changing it
      if(user.username===this.username){
        this.currentUser = true;
      }
      else{
        this.currentUser = false;
      }
      // always reload user in the case of changes
      this.UserData.getUser(user.username.toString()).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
              }else{
                //user found
                  this.currUser = data;
                  this.choosenPicture= this.directory + this.user.gender + ".jpg";
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
    });

  }

  getUser() {
      this.UserData.getUser(this.username).subscribe(
            data => {
              if(data.hasOwnProperty('message')){
                //user not found
              }else{
                //user found
                  this.found = true;
                  this.user = data;
                  this.choosenPicture= this.directory + this.user.gender + ".jpg";
                  
              }
            },
            err => console.log("Unsuccessful!" + err),
            () => console.log("Finished")
        );
    }
  showRaters(){
    let ratersModal = this.modalCtrl.create(RatersModelPage, { raters: JSON.stringify(this.user.ratings.ratedby) });
    ratersModal.present();
  }

  toggleSkills(){
    this.showSkills= !this.showSkills;
  }

  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Rate ' + this.username,
      message: "Rate " + this.username + ' out of five stars',
      inputs: [
        {
          name: 'rate',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.rate!=""){          
                var f=false;
                console.log(data.rate);
                if(data.rate>5){
                  data.rate=5;
                }
                if(data.rate<0){
                  data.rate=0;
                }

                  //pull down the latest doc of the user, in case of changes
                  this.UserData.getUser(this.username).subscribe(
                      latestUser => {
                        if(latestUser.hasOwnProperty('message')){
                          //user not found
                        }else{
                          //user found
                            this.found = true;
                            this.user = latestUser;
                            this.choosenPicture= this.directory + this.user.gender + ".jpg";
                            
                            if(this.user.ratings.ratedby.length===0){
                              console.log("No ratings");
                              //add the username and rate to rated by
                              this.user.ratings.ratedby.push({username: this.currUser.username, rate: parseInt(data.rate)});
                              this.user.ratings.rating.sum_of_rates = parseInt(data.rate);
                              this.user.ratings.rating.rate_count = 1;
                              
                            }else{
                              for(var i=0;i<this.user.ratings.ratedby.length;i++){
                                if(this.user.ratings.ratedby[i].username===this.currUser.username){
                                  console.log("This user has rated before");
                                  f=true;
                                  //change rate
                                  //minus the old rate
                                  this.user.ratings.rating.sum_of_rates -= this.user.ratings.ratedby[i].rate;
                                  //add the new rate
                                  this.user.ratings.rating.sum_of_rates += parseInt(data.rate);
                                  //overwrite the old raate
                                  this.user.ratings.ratedby[i].rate = parseInt(data.rate);
                                }
                              }
                              if(!f){
                                console.log("This user has NOT rated before");
                                //get latest user
                                //add the username and rate to rated by
                                this.user.ratings.ratedby.push({username: this.currUser.username, rate: parseInt(data.rate)});
                                //add the rate to the sum
                                this.user.ratings.rating.sum_of_rates += parseInt(data.rate);
                                //increment the rate counter
                                this.user.ratings.rating.rate_count ++;
                              }
                            }       
                        }
                        console.log(this.user.ratings);
                        this.updateUser();
                      },
                      err => {
                        console.log("Unsuccessful!" + err);
                        this.found=false;
                    },
                      () => console.log("Finished")
                  );
              console.log(data.rate); 
            }
          }
        }
      ]
    });
    prompt.present();
  }
  updateUser(){
    this.UserData.updateUser(this.user).subscribe(
      data =>{
        if(data.hasOwnProperty('message')){
          //user wasn't found
          this.showAlert("Whoops","Looks like something went wrong!");
        }else{
          //Successful
          this.user = data;
        }
      },
      err => this.showAlert("Whoops","Looks like something went wrong!"),
      () => console.log("Finished")
    );
  }
  showAlert(t: string, subT: string){
    let alert = this.alertCtrl.create({
                title: t,
                subTitle: subT,
                buttons: ['Dismiss']
              });
              alert.present();
    }
  editProfile(){
    this.navCtrl.push(EditProfilePage);
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
          ratedby: []
        },
        bookmarks: [],
        projects: []
      }
  }
}
