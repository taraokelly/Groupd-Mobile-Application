import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Proj } from '../../objects/project';

@Injectable()
export class UserData {
  constructor(public http: Http) {}
}