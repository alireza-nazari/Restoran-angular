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
  data : string;
  public date = new Date();
  ref: any;
  constructor(public orderService: OrderService) {
   }

  ngOnInit() {
    this.orderService.getOrders()
    .subscribe(
      (res: string[]) =>{
        this.meals = res;

      } 
    );
  }
  all(){
    this.orderService.getOrders()
    .subscribe(
      (res: string[]) =>{
        this.meals = res;
      } 
    );
  }
  today(date: HTMLParagraphElement){
    this.ref = date.innerHTML;
    this.orderService.todayOrders(this.ref)
    .subscribe(
      (res: Array<string>) =>{
        for(let i = 0;i < res.length; i++){
         this.data = res[i];
        }
      }
    )
  }
}
