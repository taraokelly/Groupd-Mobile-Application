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

  login(user: User){
    //Save user to storage, trigger logged in event
    this.setCurrentUser(user);
    this.events.publish('user:login');
  }
    setState(s){
      this.storage.set("state",s);
    }

   logout(){
    this.storage.set("state", "loggedOut");
    this.events.publish('user:logout');
  }
  //logged in or out
  getState(): Promise<String>{
    return this.storage.get("state").then((value) => {
                    console.log("In get state");
                    return value;
     }); 
  }

  setCurrentUser(user: User): void{
     this.storage.set("currentUser", JSON.stringify(user));
     this.events.publish('user:changed');
  }

  getCurrentUser(): Promise<User>{
     return this.storage.get("currentUser").then((value) => {
                    console.log("In get current details - app provider");
                    console.log(JSON.parse(value));
                    return JSON.parse(value);
     }); 
   
  }

  getUser(user: string){
    return this.http.get('http://127.0.0.1:8080/api/users' + "/" + user)
    .map(res => res.json());
  }

  getAllUsers(){
    return this.http.get('http://127.0.0.1:8080/api/users')
    .map(res => res.json());
  }

  updateUser(user: User){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://127.0.0.1:8080/api/users' + "/" + user.username, JSON.stringify(user), 
      {
        headers: headers
      })
      .map(res => res.json());
  }
  deleteUser(user: string){
     return this.http.delete('http://127.0.0.1:8080/api/users' + "/" + user)
    .map(res => res.json());
  
  }
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
