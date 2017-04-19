import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';


export interface User {
  
}

@Injectable()
export class UserData {
  constructor(public http: Http, public events: Events) {}

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
