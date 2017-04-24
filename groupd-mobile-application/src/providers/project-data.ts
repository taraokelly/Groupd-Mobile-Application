import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';

//import { Proj } from '../../objects/project';

@Injectable()
export class ProjectData {
  constructor(public http: Http) {}

  addProject(project: string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:8080/api/projects', project, 
    {
      headers: headers
    })
    .map(res => res.json());
  }
}