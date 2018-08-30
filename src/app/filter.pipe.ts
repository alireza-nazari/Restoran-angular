import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any): any {
    console.log(term)
    if (term == 'undefined'){
      return users;
    }
    else if(users == '') {
      return users;
    }
    else if(term == '') {
      return users;
    }
    else{
      return users.filter(function (user) {
        return user.name.toLowerCase().includes(term.toLowerCase())
      })
    }
  }

}
