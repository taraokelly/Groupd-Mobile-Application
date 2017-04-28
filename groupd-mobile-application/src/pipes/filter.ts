import { Injectable, Pipe } from '@angular/core'; //, PipeTransform 
import { PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter implements PipeTransform{

  transform(items: any[], args: string):any {

    console.log("In filter transform.");
    console.log("Items:");
    console.log(items);
    console.log("Args:");
    console.log(args);
    /*if(!items){
      console.log("In filter if(!items).");
     return items;
    }*/
    if(args=== null || args===undefined){
      console.log("In filter if(args=== null || args===undefined).");
     return items;
    }
    return items.filter(item => {
      //console.log(item);
      return item.projectCreator === args;
    });
  }
}
