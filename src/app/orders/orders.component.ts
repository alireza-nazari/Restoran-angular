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
        'height': '15px',
        'transition': 'visibility 0s, height 0.2s',
        'visibility': 'hidden',
      })),
      state('expand', style({
        'height': '135px',
        'transition': 'visibility 0.5s, height 0.2s',
        'visibility': 'visible',

      })),
      state('expandMore', style({
        'height': '200px',
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
  term: any = '';
  more: boolean = false;
  userInputTr: string = 'normal';
  userInput: boolean = true;
  advanced: boolean = false;
  arrow: string = 'arrow-down'
  userID: any;
  attachOutsideOnClick: boolean;
  todaysDate : Date;
  result: boolean = false;
  public date = new Date();
  latestOrder: number;
  piece: any;
  value: any;
  public id: number = 0;
  order: string = 'id';
  reverse: boolean = false;
  public moreData: any = [];
  public state: any = 'normal';
  public user: boolean;
  constructor(public orderService: OrderService,
    private datepipe: DatePipe  
  ) {
  }
  animate(paragraph: HTMLParagraphElement) {
    this.user = true;
    this.advanced = false;
    this.state === 'normal' ? this.state = 'expand' : this.state = 'normal';
    paragraph.innerText = 'Detaljnjije';
    this.arrow = 'arrow-down';
    this.advanced = false;
    this.more = false;
  }
  ngOnInit() {
    this.today();
    setInterval(() => {
      this.today();
    }, 5000)
  }
  all() {
    this.orderService.getOrders(this.id)
      .subscribe(
        (res: Array<any>) => {
          this.data = [];
          console.log(this.data)
          for (let r of res) {
            if (r.piece === false) {
              this.data.push({
                type: 'gr.',
                id: r.order_id,
                name: r.client.name,
                date: r.order_date,
                mealName: r.meal.name,
                user: r.client.username,
                amount: r.quantity
              })
            } else
              if (r.piece === true) {
                this.data.push({
                  type: 'kom.',
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
  today() {
    this.todaysDate = new Date() 
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.todayOrders(transformdate, this.id)
      .subscribe(
        (res: Array<any>) => {
          this.data = [];
          for (let r of res) {
            this.latestOrder = r.order_id;
            if (r.piece === false) {
              this.data.push({
                type: 'kom.',
                id: r.order_id,
                name: r.client.name,
                date: r.order_date,
                mealName: r.meal.name,
                user: r.client.username,
                amount: r.quantity
              })
            } else
              if (r.piece === true) {
                this.data.push({
                  type: 'gr.',
                  id: r.order_id,
                  name: r.client.name,
                  date: r.order_date,
                  mealName: r.meal.name,
                  user: r.client.username,
                  amount: r.quantity
                })
              }
          }
          console.log(this.latestOrder)
        }
      )
  }
  moreOrders() {
    this.id += 10;
    console.log(this.id)
    this.orderService.getOrders(this.id)
      .subscribe(
        (res: Array<any>) => {
          console.log(this.moreData)
          this.moreData = [];
          for (let r of res) {
            if (r.piece === false) {
              this.moreData.push({
                type: 'gr.',
                id: r.order_id,
                name: r.client.name,
                date: r.order_date,
                mealName: r.meal.name,
                user: r.client.username,
                amount: r.quantity
              })
            } else
              if (r.piece === true) {
                this.moreData.push({
                  type: 'kom.',
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
  fromToData(form: NgForm) {
    if(this.userID == 'undefined' || this.userID == '' || this.userID == null){
      this.orderService.fromTo(form.value.from, form.value.to)
      .subscribe(
        (res) => {
          this.data = this.orderService.createArray(res)
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else{
      this.orderService.combination(form.value.from, form.value.to, this.userID)
      .subscribe(
        (res) => {
          console.log(res)
          this.data = this.orderService.createArray(res);
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
  passData(username, id, input: HTMLInputElement){
    input.value = username;
    this.userID = id;
    this.users = [];
  }
  userData(dateOf: any) {
    this.attachOutsideOnClick = false;
    this.orderService.user(dateOf.value.user)
      .subscribe(
        (res) => {
          this.users = res;
          console.log(res)
          this.result = true;
        }
      )
  }
  showInput() {
    this.userInput === false ? this.userInput = true : this.userInput = false;
    console.log(this.userInputTr)
    this.userInputTr === 'normal' ? this.userInputTr = 'expand' : this.userInputTr = 'normal';

  }
  autocomplete(userName, id, element: HTMLInputElement) {
    element.value = userName;
    this.orderService.getByUser(id)
      .subscribe(
        (res) => {
          this.data = [];
          for (let r of res) {
            if (r.piece === false) {
              this.data.push({
                type: 'gr.',
                id: r.order_id,
                name: r.client.name,
                date: r.order_date,
                mealName: r.meal.name,
                user: r.client.username,
                amount: r.quantity
              })
            } else
              if (r.piece === true) {
                this.data.push({
                  type: 'kom.',
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
  showAdvanced(paragraph: HTMLParagraphElement, first: HTMLFontElement, second: HTMLFontElement) {
    console.log(this.state)
    if(this.state === 'expand'){
      this.state = 'expandMore';
      this.advanced = true;
      paragraph.innerText = 'Manje'
      this.arrow = 'arrow-up';
      this.more = true;
    }else{
      this.state = 'expand';
      paragraph.innerText = 'Detaljnjije';
      this.arrow = 'arrow-down';
      this.advanced = false;
      this.more = false;
    }
  }
  singleUser(data: HTMLInputElement){
    console.log(data.value, this.userID)
    this.orderService.getByUser(this.userID)
    .subscribe(
      (res) => {      
        this.data = this.orderService.createArray(res);
      },
      (error) =>{
        alert('Greska')
      }
    )
  }
  onClickedOutside(event){
    console.log("w");
  }
}