import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'reverse'
})
@Injectable()
export class Reverse {
  //reverse list
  transform(value) {
    if(!value){
     return;
    }
    return value.slice().reverse();
  }
}
