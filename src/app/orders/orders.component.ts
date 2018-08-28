import { Component, OnInit,  OnDestroy,  Input, HostListener} from '@angular/core';

import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';
import { trigger, state, style } from '@angular/animations';

import { NgForm } from '@angular/forms';


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
        'height': '240px',
        'transition': 'visibility 0.5s, height 0.2s',
        'visibility': 'visible',
      })),
    ])
  ],

})
export class OrdersComponent implements OnInit, OnDestroy{
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
  clickedFunction: string;
  formData: NgForm;
  singleUserData: HTMLInputElement;
  sortNumber: number = 0;
  angleType: string = 'angle-down'

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
  i: number = 0;


  constructor(public orderService: OrderService,
              private datepipe: DatePipe) {
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
    this.today(true);
  }
  all() {
    this.orderService.getOrders(this.id)
      .subscribe(
        (res: Array<any>) => {
          this.data = this.orderService.createArray(res);
        }
      );
  }
  today(event: boolean){
    this.orderService.emptyOut();
    this.clickedFunction = 'today';
    this.todaysDate = new Date();
    if(event == true){
      this.data = [];
      this.id = 0;
    }
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.todayOrders(transformdate, this.id)
      .subscribe(
        (res: Array<any>) =>{
          this.data = this.data.concat(this.orderService.createArray(res))
        }
      )
  }
  moreOrders() {
    this.id += 10;
    if(this.clickedFunction == 'today'){
      this.today(false)
    }
    else if(this.clickedFunction == 'fromToData'){
      console.log("DSA")
      this.fromToData(this.formData, false)
    }
    else if(this.clickedFunction == 'singleUser'){
      this.singleUser(false)
    }
  }
  sort(){
    this.sortNumber +=1;
    if(this.sortNumber == 1){
      this.angleType = 'angle-up'
      this.data.sort(function(a, b){
        return a.id-b.id;
      })
    }else{
      this.angleType = 'angle-down'
      this.sortNumber = 0;
      this.data.sort(function(a, b){
        return b.id-a.id;
      })
    }

  }
  fromToData(form: NgForm, event: boolean) {
    this.orderService.emptyOut();
    this.formData = form;
    this.clickedFunction = 'fromToData';
    if(event == true){
      this.id = 0;
      this.data = [];
      console.log(event)
    }
    if(this.userID == 'undefined' || this.userID == '' || this.userID == null){
      this.orderService.fromTo(this.formData.value.from, this.formData.value.to, this.id)
      .subscribe(
        (res) => {
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else if(form.value.from == '' && form.value.to == '' && this.userID != null){
      this.orderService.getByUser(this.userID, this.id)
      .subscribe(
        (res) => {
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) =>{
          alert('Greska')
        }
      )
    }
    else{
      this.orderService.combination(form.value.from, form.value.to, this.userID, this.id)
      .subscribe(
        (res) => {
          console.log(res)
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          console.log(error)
        }
      )
    }
    // let xs = [5,4,3,-22,1];
    // xs.sort((a,b)=>a-b); // Ascending sort
    // console.log(xs); // [-22,1,3,4,5]
    
  }
  passData(username, id, input: HTMLInputElement){
    input.value = username;
    this.userID = id;
    this.users = [];
  }
  userData(dateOf: any) {
    if(dateOf.value.user == ''){
      this.users = [];
    }else{
    this.orderService.user(dateOf.value.user)
      .subscribe(
        (res) => {
          this.users = res;
          this.result = true;
        }
      )
    }
  }
  showInput() {
    this.userInput === false ? this.userInput = true : this.userInput = false;
    console.log(this.userInputTr)
    this.userInputTr === 'normal' ? this.userInputTr = 'expand' : this.userInputTr = 'normal';

  }
  autocomplete(userName, id, element: HTMLInputElement) {
    element.value = userName;
    this.orderService.getByUser(id, this.userID)
      .subscribe(
        (res) => {
          this.attachOutsideOnClick = true;
          this.data = [];
          this.data = this.orderService.createArray(res);
        }
      )
  }
  showAdvanced(paragraph: HTMLParagraphElement) {
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
  singleUser(event: boolean){
    if(event == true){
      this.data = [];
      this.id = 0;
    }else if(event == false){
      
    }
    this.orderService.emptyOut();
    this.clickedFunction = 'singleUser'
    console.log(this.id)
    this.orderService.getByUser(this.userID, this.id)
    .subscribe(
      (res) => {      
        this.data = this.data.concat(this.orderService.createArray(res))
      },
      (error) =>{
        alert('Greska')
      }
    )
  }
  onClickedOutside(auto: HTMLDivElement){
    this.result = false;
  }
  ngOnDestroy(){
    this.orderService.emptyOut();
    
  }
  showAuto(auto: HTMLDivElement){
    if(this.users != '' || this.users != 'undefined'){
      
      this.result = true;
    }
  }
}