import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(orders: any, type: any): any {
    if(type === 'undefined'){
      return orders;
    }
    if(orders == ''){
      return orders;
    }
    return orders.filter(function(order){
      if(order.piece == true){
        console.log('gram')
      }
      if(order.piece == false){
        console.log('komad')
      }
    })
  }

}
