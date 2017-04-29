import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'filterprojects'
})
@Injectable()
export class FilterProjects {
 
  transform(items: any[], args: string):any {
    if(args === null || args === undefined || args === ""){
     return [];
    }
    return items.filter(item => {
      return item.projectName === args || (item.tags.indexOf(args) > -1);
    });
  }
}
