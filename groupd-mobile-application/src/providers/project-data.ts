import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Proj } from "../objects/project";

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
  getAllProjects(){
    return this.http.get('http://127.0.0.1:8080/api/projects')
    .map(res => res.json());
  }
  getProject(project: string){
    return this.http.get('http://127.0.0.1:8080/api/projects' + "/" + project)
    .map(res => res.json());
  }
  updateProject(project: Proj){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('http://127.0.0.1:8080/api/projects' + "/" + project.projectId, JSON.stringify(project), 
      {
        headers: headers
      })
      .map(res => res.json());
  }
  deleteProject(project: string){
     return this.http.delete('http://127.0.0.1:8080/api/projects' + "/" + project)
    .map(res => res.json());
  
  }
}