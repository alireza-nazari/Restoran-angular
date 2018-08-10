import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  meals: any = [];
  data: any = [];
  public date = new Date();
  ref: any;
  piece: any;
  value: any;
  constructor(public orderService: OrderService) {
   }

  ngOnInit() {
    this.orderService.getOrders()
    .subscribe(
      (res: Array<any>) =>{
        for(let r of res){
          if(r.piece === false){
            this.data.push({
              type :'gr.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
          })
          }else 
          if(r.piece === true){
            this.data.push({
              type :'kom.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
            })
          }
        }
      }
    );
  }
  all(){
    this.orderService.getOrders()
    .subscribe(
      (res: Array<any>) =>{
        this.data = [];
console.log(this.data)
        for(let r of res){
          if(r.piece === false){
            this.data.push({
              type :'gr.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
          })
          }else 
          if(r.piece === true){
            this.data.push({
              type :'kom.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
            })
          }
        }
      }
    );
  }
  today(date: HTMLParagraphElement){
    this.ref = date.innerHTML;
    this.orderService.todayOrders(this.ref)
    .subscribe(
      (res: Array<any>) =>{
        this.data = [];
        for(let r of res){
          if(r.piece === false){
            this.data.push({
              type :'kom.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
          })
          }else 
          if(r.piece === true){
            this.data.push({
              type :'gr.',
               id: r.order_id,
              name: r.client.name,
              date: r.order_date,
              mealName: r.meal.name,
              user: r.client.username,
              amount: r.quantity
            })
          }
        }
      }
    )
  }
}