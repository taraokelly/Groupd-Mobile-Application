import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter {

  transform(items: any[], args: String) {
    if(!items){
     return;
    }
    return items.filter(item => {
      return item.creator === args;
    });
  }
}
