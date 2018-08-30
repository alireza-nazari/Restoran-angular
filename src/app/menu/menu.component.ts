import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, AfterContentInit, DoCheck } from '@angular/core';
import { MealsService } from '../meals.service';

import { SearchService } from '../search.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { CategoriesService } from '../categories/categories-service';
import { trigger, state, style } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { concat } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menuTransition', [
      state('hidden', style({
        'visibility': 'hidden',
        'height': '0px',
        'transition': 'height 0.2s'
      })),
      state('show', style({
        'visibility': 'visible',
        'height': '20px',
        'transition': 'height 0.2s'
      }))
    ])
  ]
})
export class MenuComponent implements OnInit,  DoCheck{
  meals: any = [];
  response: any = [];
  sub: any;
  status = true;
  try: boolean = false;
  staticAlertClosed = true;
  error: any;
  spinerGroup: boolean = false;

  public state: any = "hidden";

  public id: any;

  closeResult: string;
  type: string;

  menu: any;
  page: number = 0;

  previousPage: number;

  

  identifer: any;
  subscribeState: string;
  public visible: boolean = false;
  count = 0;
  subed: Subscription;
  subede: Subscription;
  spiner: boolean = false;

  @Input('page') masterName: string;

  constructor(private mealsService: MealsService,
    private searchService: SearchService,
    private router: Router,
    private auth: AuthGuardService,
    private tostr: ToastrService,
    private route: ActivatedRoute,
    private cate: CategoriesService,
    private modalService: NgbModal,
    private menuData: DataService) {

  }
  ngDoCheck(){
    if(this.id != this.route.snapshot.params['id'] || this.id == 'undefined')
    {
      this.meals = [];
      this.page = 0;
      this.getMealsByID(this.page)
    }else{
    }
  }


  onInViewportChange(inViewport: boolean) {
    this.visible = inViewport;
    if (this.visible == true) {
      this.getMealsByID(this.page)
    }
  }
  getMealsByID(num: number) {
    this.id = this.route.snapshot.params['id'];
    if (this.id == this.identifer) {
      this.oldData(this.page)
    }
    else {
      this.page = 0;
      this.identifer = this.id
      this.newData(this.page)
    }
  }
  oldData(num) {
    this.spinerGroup = true;
          var sub = this.cate.getByCategory(this.id, num)
            .subscribe(
              (res: Array<any>[]) => {
                setTimeout(() => {
                  this.spiner = true;
                }, 500)
                this.meals = this.meals.concat(res);
                for(let meal of this.meals){
                  if(meal.piece == true){
                      meal.piece = 'Gram'
                  }
                  else if(meal.piece == false){
                    meal.piece = 'omad'
                  }
                }
                this.page += 10;
                this.spinerGroup = false;
              },
              (error) => {
                this.spinerGroup = false;
              }
            );
  }
  newData(num) {
    this.spinerGroup = true;
          var sub = this.cate.getByCategory(this.id, num)
            .subscribe(
              (res: Array<any>[]) => {
                setTimeout(() => {
                  this.spiner = true;
                }, 500)
                console.log(res)
                this.meals = res;
                for(let meal of this.meals){
                  if(meal.piece == true){
                      meal.piece = 'Gram'
                  }
                  else if(meal.piece == false){
                    meal.piece = 'Komad'
                  }
                }
                this.page += 10;
                this.spinerGroup = false;
          },
          (error) => {
            this.spinerGroup = false;
          }
        );
  }
  postIt(data: any) {
    if (data.piece) {
      this.type = "grama";
    }
    else {
      this.type = "komad/a";
    }
    this.mealsService.postOrder(data)
      .subscribe(
        (res: Response) => {
          this.tostr.success('Količina: ' + data.amount + ' ' + this.type, 'Porudzbina: ' + data.info);
          console.log(res)
        },
        (error) => {
          if (error.status === 401) {
            this.tostr.error('Vaša sesija je istekla', 'Porudzbina nije prosledjena!');
          }
          else {
            this.tostr.error('Došlo je do greške', 'Pokušajte ponovo!')
          }
        }
      )
  }
  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showMenu() {
    this.status = true;
    console.log(status)
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  sendIt(data: any) {
    this.menuData.sendData(data);
    this.tostr.success('Prosledjeno u korpu');
  }
  ngOnInit(){
    
  }
}
