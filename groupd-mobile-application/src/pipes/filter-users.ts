import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'filter-users'
})
@Injectable()
export class FilterUsers {
  
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
