import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';
import { trigger, state, style } from '@angular/animations';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { NgForm } from '@angular/forms';
import { FilterPipe } from '../filter.pipe'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
    animations: [
    trigger('divState', [
      state('normal', style({
        'height': '10px',
        'transition': 'visibility 0s, height 0.2s',
        'visibility': 'hidden',
      })),
      state('expand', style({
        'height': '190px',
        'transition': 'visibility 0.5s, height 0.2s',
        'visibility': 'visible',

      })),
    ])
  ],
  
})
export class OrdersComponent implements OnInit {
  meals: any = [];
  data: any = [];
  users: any = [];
  term: any;
  userInputTr: string = 'normal';
  userInput: boolean = true;

  result: boolean = false;
  public date = new Date();
  ref: any;
  piece: any;
  value: any;
  public id: number = 0;
  order: string = 'id';
  reverse: boolean = false;
  public moreData: any = [];
  public state: any = 'normal';
  public user: boolean;
  constructor(public orderService: OrderService,
              ) {
   }
   animate(data: any){
    if(data == 'user'){
      this.user = false;
    }
    else if(data =='calender'){
      this.user = true;
    }
    this.state === 'normal' ? this.state = 'expand' : this.state = 'normal';
  }
  ngOnInit() {
    this.orderService.getOrders(this.id)
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
    this.orderService.getOrders(this.id)
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
    this.orderService.todayOrders(this.ref, this.id)
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
  moreOrders(){
    this.id += 10;
    console.log(this.id)
    this.orderService.getOrders(this.id)
    .subscribe(
      (res: Array<any>) =>{
      console.log(this.moreData)
      this.moreData = [];
        for(let r of res){
          if(r.piece === false){
            this.moreData.push({
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
            this.moreData.push({
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
        this.data = this.data.concat(this.moreData)
      }
    );
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
  this.order = value;
  }
  fromToData(form: NgForm){
    this.orderService.fromTo(form.value.from, form.value.to)
    .subscribe(
      (res) => {
        console.log(res)
      },
      (error) =>{
        console.log(error)
      }
    )
  }
  userData(user: NgForm){
    console.log(user.value)
    this.orderService.user(user.value)
    .subscribe(
      (res) => {
        this.users = res;
        console.log(res)
        this.result = true;
      }
    )
  }
  showInput(){
    this.userInput === false ? this.userInput = true : this.userInput = false;
    this.userInputTr === 'normal' ? this.userInputTr = 'expand' : this.userInputTr = 'normal';
  }
  autocomplete(userName, id, element: HTMLInputElement){
    element.value= userName;
    this.orderService.getByUser(id)
    .subscribe(
      (res) => {
        this.data = [];
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
    )
  }
}