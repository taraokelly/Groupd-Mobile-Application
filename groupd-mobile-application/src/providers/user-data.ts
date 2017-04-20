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
    this.storage.set ("currentUser", JSON.stringify(user));
    //console.log(user);
    this.events.publish('user:login');
  }

  getCurrentUser(): Promise<User>{
     return this.storage.get("currentUser").then((value) => {
                    return JSON.parse(value);
     }); 
   
  }

  getUser(user: string){
    return this.http.get('http://127.0.0.1:8080/api/users' + "/" + user)
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
