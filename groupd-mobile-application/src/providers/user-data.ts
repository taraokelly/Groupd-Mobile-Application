import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


export interface User {
  
}

@Injectable()
export class UserData {
  constructor(public events: Events, public storage: Storage) {}


  
}
