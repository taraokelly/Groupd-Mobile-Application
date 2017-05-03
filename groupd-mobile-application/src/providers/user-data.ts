import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { User } from "../objects/user";

@Injectable()
export class UserData {

  constructor(public http: Http, public events: Events, public storage: Storage) {}

  //set user and has logged in
   //fire event 'user:login'
  login(user: User){
    //Save user to storage, trigger login in event
    this.storage.set('hasLoggedIn', true);
    this.setCurrentUser(user);
    this.events.publish('user:login');
  }
  //remove has logged in and curr user
  //fire event 'user:logout'
   logout(){
    this.storage.remove('hasLoggedIn');
    this.storage.remove('currentUser');
    this.events.publish('user:logout');
  }
  //set the current user
  setCurrentUser(user: User): void{
     this.storage.set("currentUser", JSON.stringify(user));
     this.events.publish('user:changed');
  }
  //get the user currently in storage
  getCurrentUser(): Promise<User>{
     return this.storage.get("currentUser").then((value) => {
                    console.log("In get current details - app provider");
                    console.log(JSON.parse(value));
                    return JSON.parse(value);
     }); 
   
  }
  //get has logged in
  hasLoggedIn(): Promise<boolean> {
    return this.storage.get('hasLoggedIn').then((value) => {
      return value;
    });
  }
  //set and get has seen tutorial
  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get('hasSeenTutorial').then((value) => {
      return value;
    });
  }
  setHasSeenTutorial(): void {
    this.storage.set('hasSeenTutorial', true);
  }

  //http request to handle user data

  //get certain user
  getUser(user: string){
    return this.http.get('http://127.0.0.1:8080/api/users' + "/" + user)
    .map(res => res.json());
  }
  //get all users
  getAllUsers(){
    return this.http.get('http://127.0.0.1:8080/api/users')
    .map(res => res.json());
  }
  //put request to update user
  updateUser(user: User){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://127.0.0.1:8080/api/users' + "/" + user.username, JSON.stringify(user), 
      {
        headers: headers
      })
      .map(res => res.json());
  }
  //delete user
  deleteUser(user: string){
     return this.http.delete('http://127.0.0.1:8080/api/users' + "/" + user)
    .map(res => res.json());
  
  }
  //post to add user
  addUser(user: string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8080/api/users', user, 
    {
      headers: headers
    })
    .map(res => res.json());
  }
  
}
