import { Injectable, Pipe } from '@angular/core'; //, PipeTransform 
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter implements PipeTransform{

  transform(items: any[], args: string):any {

    if(args === null || args === undefined){
     return items;
    }
    return items.filter(item => {
      return item.projectCreator === args || (item.projectMembers.indexOf(args) > -1);
    });
  }
}
