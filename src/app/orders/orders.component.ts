import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

import { DatePipe } from '@angular/common';
import { OrderService } from './order-service';
import { trigger, state, style } from '@angular/animations';

import { NgForm } from '@angular/forms';
import { ToastrService, Toast } from 'ngx-toastr';

import { AuthService } from '../auth/auth.service';
import decode from 'jwt-decode';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [NgbDropdownConfig],
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
export class OrdersComponent implements OnInit, OnDestroy {
  meals: any = [];
  data: any = [];
  users: any = [];
  term: string = '';
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
  todaysDate: Date;
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
  spinerGroup: boolean = false;
  spinner: boolean = false;
  admin: boolean;
  simpleUser: boolean;
  current: string;
  allUsers: any = [];
  checkedUsers: any = [];
  names: any = '';
  itera: number;
  allNumber: number = 0;
  showedNumber: number = 0
  remainNumber: number = 0;
  angle: boolean = false;
  inputCheck: HTMLInputElement;
  
  constructor(public orderService: OrderService,
    private datepipe: DatePipe,
    private auth: AuthService,
    config: NgbDropdownConfig,
    private tostr: ToastrService
  ) {
    config.autoClose = ("outside");
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
    const token = this.auth.getToken();
    const tokenPayload = decode(token);
    this.current = tokenPayload.name;
    if (tokenPayload.role == 'admin') {
      this.getUsers();
      this.today(true);
      this.admin = true;
      this.simpleUser = false;
    }
    else {
      this.userID = tokenPayload.id
      this.admin = false;
      this.simpleUser = true;
      this.myOrders()
    }

  }
  createPdf(){
    window.print();
  }
  event(eve: HTMLInputElement) {
    console.log(eve.value)
  }
  getUsers() {
    this.orderService.allUsers()
      .subscribe(
        (res) => {
          this.allUsers = res;
          console.log(this.allUsers)
        },
        (error) => {
          alert("Doslo je do greske")
        }
      )
  }
  all() {
    this.orderService.getOrders(this.id)
      .subscribe(
        (res: Array<any>) => {
          this.data = this.orderService.createArray(res);
        }
      );
  }
  today(event: boolean) {
    this.userID = null;
    this.formData = null;
    this.singleDateUser = '';
    if(this.admin == true && event == true){
      this.orderService.emptyOut();
    }
    if(event == true) {
      this.data = [];
      this.id = 0;
      this.allNumber = 0;
      this.showedNumber = 0
      this.remainNumber = 0;
      transformdate = '';
    }
    var transformdate: any;
    this.spinner = true;
    this.spinerGroup = true;
    this.alert = false;
    this.orderService.emptyOut();
    this.clickedFunction = 'today';
    this.todaysDate = new Date();

    transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.todayOrders(transformdate, this.id)
      .subscribe(
        (res) => {
          console.log(res)
          if (res != '') {
            this.allNumber = res[0].numberOfElements;
            this.showedNumber += res.length;
            this.remainNumber = this.allNumber - this.showedNumber;
          }

          if (this.data == [] && res == '') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Trenutno ne postoje porudzbine za današnji datum'
          }
          else if (res == '' && this.data != []) {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          this.data = this.data.concat(this.orderService.createArray(res))
          this.spinner = false;
          this.spinerGroup = false;
          this.angle = true;
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
  moreOrders() {
    this.spinner = true;
    this.spinerGroup = true;
    this.id += 10;
    if (this.clickedFunction == 'today') {
      this.today(false);
      this.spinner = false;
      this.spinerGroup = false;
    }
    else if (this.clickedFunction == 'fromToData') {
      this.fromToData(this.formData, false);
      this.spinner = false;
      this.spinerGroup = false;
    }
    else if (this.clickedFunction == 'singleUser') {
      this.singleUser(false, this.singleDateUser);
      this.spinner = false;
      this.spinerGroup = false;
    }
    else if (this.clickedFunction == 'myOrders') {
      this.myOrders();
      this.spinner = false;
      this.spinerGroup = false;
    }
  }
  sort() {
    this.sortNumber += 1;
    if (this.sortNumber == 1) {
      this.angleType = 'angle-up'
      this.data.sort(function (a, b) {
        return a.order_id - b.order_id;
      })
    } else {
      this.angleType = 'angle-down'
      this.data.sort(function (a, b) {
        return b.order_id - a.order_id;
      })
      this.sortNumber = 0;
    }

  }
  fromToData(form: NgForm, event: boolean) {
    this.spinner = true;
    this.spinerGroup = true;
    this.alert = false;
    this.orderService.emptyOut();
    this.formData = form;
    this.clickedFunction = 'fromToData';
    if (event == true) {
      this.id = 0;
      this.data = [];
    }
    if (this.userID == 'undefined' || this.userID == '' || this.userID == null && form.value.from != '' && form.value.to != '') {
      this.orderService.fromTo(this.formData.value.from, this.formData.value.to, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res))
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if ((this.userID == 'undefined' && form.value.from != "") && (form.value.to == "" || form.value.to == 'undefined')) {
      this.orderService.singleStartingDate(form.value.from, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res))
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if (form.value.from == '' && form.value.to == '' && this.userID != null) {
      this.orderService.getByUser(this.userID, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res))
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if (form.value.from != '' && form.value.to != '' && this.userID != null) {
      this.orderService.combination(form.value.from, form.value.to, this.userID, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res));
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if (this.userID == null || this.userID == 'undefined' && form.value.from == '' && form.value.to != '') {
      this.orderService.toDate(form.value.to, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res));
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if ((this.userID != null || this.userID != 'undefined') && (form.value.from != '' && form.value.to == '')) {
      this.orderService.fromAndUser(form.value.from, this.userID, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              console.log("DS")
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res));
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
    else if ((this.userID != null || this.userID != 'undefined') && form.value.from == '' && form.value.to != '') {
      this.orderService.toAndUser(form.value.to, this.userID, this.id)
        .subscribe(
          (res) => {
            if (this.data != [] && res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Prikazali ste sve porudzbine'
            }
            else if (res == '') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Nema porudzbina sa zadatim uslovima'
            }
            this.data = this.data.concat(this.orderService.createArray(res));
            this.spinner = false;
            this.spinerGroup = false;
          },
          (error) => {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške, pokušajte ponovo';
            this.spinner = false;
            this.spinerGroup = false;
          }
        )
    }
  }
  showInput() {
    this.userInput === false ? this.userInput = true : this.userInput = false;
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
    this.iter++;
    if (this.iter == 1) {
      this.advanced = true;
      paragraph.innerText = 'Manje'
      this.arrow = 'arrow-up';
      this.more = true;
      this.singleDate = false;
    } else {
      this.iter = 0;
      paragraph.innerText = 'Detaljnjije';
      this.arrow = 'arrow-down';
      this.advanced = false;
      this.more = false;
      this.singleDate = true;
    }
  }
  checkboxValue(id, name, check: HTMLInputElement, selected: HTMLInputElement) {
    if (this.names == '') {
      this.names += name;
    }
    else if (check.checked == true) {
      this.names += "," + name;
    }
    this.checkedUsers.push({
      id: id,
      name: name,
      state: check.checked
    })
    this.checkedUsers.forEach((item, index) => {
      if (item.id == id && item.state == false) {
        this.checkedUsers.splice(index, 1);
        this.names = this.names.replace(','+ item.name, '');
        this.checkedUsers.forEach((ite, inde) => {
          if (ite.id == id && ite.state == true) {
            this.checkedUsers.splice(inde, 1);
            this.names = this.names.replace(ite.name, '');
          }
        })
      }
    })
    selected.value = this.names;
   
  }
  singleUser(event: boolean, forme: NgForm) {
    this.angle = false;
    this.singleDateUser = forme;
    console.log(this.singleDateUser.value.single)
    if (event == true) {
      this.data = [];
      this.id = 0;
    }
    if (this.userID == null && forme.value.single == '' && forme.value.userSelect == '') {
      this.data = [];
      this.alert = true;
      setTimeout(() => {
        this.alert = false
      }, 10000)
      this.alertContent = 'Morate ispuniti bar jedno polje!';
    }
    else{
      if(this.admin == true) {
        this.userID = this.checkedUsers;
      }
      this.spinner = true;
      this.spinerGroup = true;
      this.singleDateUser = forme;
      this.alert = false;
      this.orderService.emptyOut();
      this.clickedFunction = 'singleUser';
      console.log(this.singleDateUser.value.single, this.userID)
      if((this.userID != null || this.userID != '' || this.userID != 'undefined') && this.singleDateUser.value.single == '' ){
        this.orderService.getByUser(this.userID, this.id)
          .subscribe(
            (res) => {

              if (this.data != [] && res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Prikazali ste sve porudzbine'
              }
              else if (res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Nema porudzbina sa zadatim uslovima'
              }
              this.data = this.data.concat(this.orderService.createArray(res));
              this.spinner = false;
              this.spinerGroup = false;
            },
            (error) => {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Došlo je do greške, pokušajte ponovo';
              this.spinner = false;
              this.spinerGroup = false;
            }
          )
      }
      else if ((this.userID == null || this.userID == '') && this.singleDateUser.value.single != '') {
        this.orderService.singleDate(this.singleDateUser.value.single, this.id)
          .subscribe(
            (res) => {
              if (this.data != [] && res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Prikazali ste sve porudzbine'
              }
              else if (res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Nema porudzbina sa zadatim uslovima'
              }
              this.data = this.data.concat(this.orderService.createArray(res));
              this.spinner = false;
              this.spinerGroup = false;
            },
            (error) => {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Došlo je do greške, pokušajte ponovo';
              this.spinner = false;
              this.spinerGroup = false;
            }
          )
      }
      else if(this.userID != null  && this.singleDateUser.value.single != '') {
        this.orderService.singleDateUser(this.singleDateUser.value.single, this.userID, this.id)
          .subscribe(
            (res) => {
              if (this.data != [] && res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Prikazali ste sve porudzbine'
              }
              else if (res == '') {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false
                }, 10000)
                this.alertContent = 'Nema porudzbina sa zadatim uslovima'
              }
              this.data = this.data.concat(this.orderService.createArray(res));
              this.spinner = false;
              this.spinerGroup = false;
            },
            (error) => {
              this.alert = true;
              setTimeout(() => {
                this.alert = false
              }, 10000)
              this.alertContent = 'Došlo je do greške, pokušajte ponovo';
              this.spinner = false;
              this.spinerGroup = false;
            }
          )
      }
    }
  }
  myOrders() {

    this.angle = false;
    this.spinner = true;
    this.spinerGroup = true;
    this.clickedFunction = 'myOrders';
    this.todaysDate = new Date();
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.singleDateUser(transformdate, this.userID, this.id)
      .subscribe(
        (res) => {
          if (this.data != [] && res == '') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if (res == '') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          }
          this.data = this.data.concat(this.orderService.createArray(res));
          this.spinner = false;
          this.spinerGroup = false;
        },
        (error) => {
          if (error.status == 401) {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Morate se ponovo prijaviti';
            this.spinner = false;
            this.spinerGroup = false;
          }
          else {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške';
            this.spinner = false;
            this.spinerGroup = false;
          }
        }
      )
  }
  onClickedOutside() {
    this.result = false;
  }
  ngOnDestroy() {
    this.orderService.emptyOut();
    if (this.admin == true) {
      this.orderService.changeStatus(this.data)
        .subscribe()
    }
  }
  closeAlert() {
    this.alert = false;
  }
  showAuto() {
    if (this.users != '' || this.users != 'undefined') {
      this.result = true;
    }
  }
  closeTodayOrders() {
    this.todaysDate = new Date();
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.closeOrders(transformdate)
      .subscribe(
        (res) => {
          this.tostr.success("Uspešno ste zatvorili porudzbine za današnji datum: " + transformdate);
        },
        (error) => {
          this.tostr.error("Došlo je do greške", "Pokušajte ponovo");
        }
      )
  }
  openTodayOrders() {
    this.todaysDate = new Date();
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.reopenOrders(transformdate)
      .subscribe(
        (res) => {
          this.tostr.success("Uspešno ste '<strong>'otvorili'</strong>' porudzbine za današnji datum: " + transformdate);
        },
        (error) => {
          this.tostr.error("Došlo je do greške", "Pokušajte ponovo");
        }
      )
  }
  allToday(){
    this.data = [];
    this.orderService.emptyOut();
    this.angle = false;
    this.spinner = true;
    this.spinerGroup = true;
    this.todaysDate = new Date();
    var transformdate = this.datepipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.orderService.allTodayOrders(transformdate)
      .subscribe(
        (res) => {

          this.data = res;
          this.data = this.orderService.createArray(res)
          if (this.data != [] && res == '') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Prikazali ste sve porudzbine'
          }
          else if (res == '') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Nema porudzbina sa zadatim uslovima'
          }
          this.spinner = false;
          this.spinerGroup = false;
        },
        (error) => {
          if(error.status == 401) {
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Morate se ponovo prijaviti';
            this.spinner = false;
            this.spinerGroup = false;
          }
          else{
            this.alert = true;
            setTimeout(() => {
              this.alert = false
            }, 10000)
            this.alertContent = 'Došlo je do greške';
            this.spinner = false;
            this.spinerGroup = false;
          }
        }

      )
      }
}