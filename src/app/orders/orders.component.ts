import { Component, OnInit } from '@angular/core';
import { MealsService } from '../meals.service';
import { AuthGuardService } from '../auth/auth-guard.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  meals = [];
  data = [];
  
  constructor(private mealService: MealsService) {
    const date = new Date();
    console.log(date);
   }

  ngOnInit() {
    this.mealService.getOrders()
    .subscribe(
      (res: string[]) =>{
        this.meals = res;
        console.log(res);

      } 
      
    );
  }
  
}
