import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  meals = [];
  data = [];
  date: any = new Date();
  
  
  constructor(public orderService: OrderService) {
   }

  ngOnInit() {
    console.log(this.date);
    this.orderService.getOrders()
    .subscribe(
      (res: string[]) =>{
        this.meals = res;
        console.log(res);

      } 
    );
  }
  today(){
    var datePipe = new DatePipe('en');
    this.date = datePipe.transform(this.date, 'yyyy-dd-mm');
    console.log(this.date)
    this.orderService.todayOrders(this.date)
    .subscribe(
      (res: Response) =>{
        console.log(res);
      }
    )
  }
}
