import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any): any {
    ///undefined
    if(term === 'undefined')
      { 
      return users;
    }
    if(users == ''){
      return users;
    }
    return users.filter(function(user){
      return user.user.toLowerCase().includes(term.toLowerCase())
    })
  }

}
