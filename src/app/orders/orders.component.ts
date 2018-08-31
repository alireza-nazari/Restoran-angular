import { Component, OnInit,  OnDestroy,  Input, HostListener} from '@angular/core';

import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';
import { trigger, state, style } from '@angular/animations';

import { NgForm } from '@angular/forms';
import { ToastrService, Toast } from 'ngx-toastr';
import { ENGINE_METHOD_DIGESTS } from 'constants';

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
        'height': '195px',
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
  singleDateUser: any;
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
  iter: number = 0;
  alertContent: string;
  alert: boolean = false;
  singleDate: boolean = true;
  constructor(public orderService: OrderService,
              private datepipe: DatePipe,
              private tostr: ToastrService) {
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
    this.alert = false;
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
        (res) =>{
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Trenutno ne postoje porudzbine za današnji datum'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          } 
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
      this.fromToData(this.formData, false)
    }
    else if(this.clickedFunction == 'singleUser'){
      this.singleUser(false, this.singleDateUser)
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
    this.alert = false;
    console.log(form.value.from, form.value.to, this.userID)
    this.orderService.emptyOut();
    this.formData = form;
    this.clickedFunction = 'fromToData';
    if(event == true){
      this.id = 0;
      this.data = [];
      console.log(event)
    }

    if(this.userID == 'undefined' || this.userID == '' || this.userID == null && form.value.from != '' && form.value.to != ''){
      this.orderService.fromTo(this.formData.value.from, this.formData.value.to, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if((this.userID == 'undefined' && form.value.from != "") && (form.value.to == "" || form.value.to == 'undefined')){
      this.orderService.singleStartingDate(form.value.from, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if(form.value.from == '' && form.value.to == '' && this.userID != null){
      this.orderService.getByUser(this.userID, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) =>{
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if(form.value.from != '' && form.value.to != '' && this.userID != null){
      this.orderService.combination(form.value.from, form.value.to, this.userID, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if(this.userID == null || this.userID == 'undefined' && form.value.from == '' && form.value.to != ''){
      this.orderService.toDate(form.value.to, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if((this.userID != null || this.userID != 'undefined') && (form.value.from != '' && form.value.to == '')){
      this.orderService.fromAndUser(form.value.from, this.userID,this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }

    else if((this.userID != null || this.userID != 'undefined') && form.value.from == '' && form.value.to != ''){
      this.orderService.toAndUser(form.value.to, this.userID,this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          } 
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
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
    if(dateOf.value.user == ''){
      this.userID = null;
      this.users = [];
    }else{
    var user = dateOf.value.user;
    this.orderService.user(user.toLowerCase())
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
    this.iter ++;
    if(this.iter == 1){
      this.advanced = true;
      paragraph.innerText = 'Manje'
      this.arrow = 'arrow-up';
      this.more = true;
      this.singleDate = false;
    }else{
      this.iter = 0;
      paragraph.innerText = 'Detaljnjije';
      this.arrow = 'arrow-down';
      this.advanced = false;
      this.more = false;
      this.singleDate = true;
    }
  }
  singleUser(event: boolean, forme: NgForm){
    this.singleDateUser = forme;
    console.log(this.singleDateUser.value.single)
    this.alert = false;
    var b;
    if(event == true){
      this.data = [];
      this.id = 0;
    }else if(event == false){
      
    }
    this.orderService.emptyOut();
    this.clickedFunction = 'singleUser';
    if(this.singleDateUser.value.single == '' && this.userID != null){
      this.orderService.getByUser(this.userID, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          }       
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) =>{
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if(this.userID == null || this.userID == 'undefined' && this.singleDateUser.value.single != ''){
      this.orderService.singleDate(this.singleDateUser.value.single, this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          }       
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) =>{
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }
    else if(this.userID != null || this.userID != null && this.singleDateUser != ''){
      this.orderService.singleDateUser(this.singleDateUser.value.single, this.userID ,this.id)
      .subscribe(
        (res) => {
          if(this.data != [] && res == ''){
            console.log("DS")
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if(res == ''){
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          }       
          this.data = this.data.concat(this.orderService.createArray(res))
        },
        (error) =>{
          this.alert = true;
          setTimeout(() => {
            this.alert = false
          }, 10000)
          this.alertContent = 'Došlo je do greške, pokušajte ponovo'
        }
      )
    }

   
  }
  onClickedOutside(){
    this.result = false;
  }
  ngOnDestroy(){
    this.orderService.emptyOut();
    
  }
  closeAlert(){
    this.alert = false;
  }
  showAuto(){
    if(this.users != '' || this.users != 'undefined'){
      this.result = true;
    }
  }
  
}