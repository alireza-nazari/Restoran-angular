import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { MealsService } from '../meals.service';

import { SearchService } from '../search.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { CategoriesService } from '../categories/categories-service';
import { trigger, state, style } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';

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
export class MenuComponent implements OnInit{
  meals: any[];
  status = true;
  staticAlertClosed = true;
  error: any;

  public state: any = "hidden";

  public id: any;

  closeResult: string;
  type: string;

  menu: any;

  @ViewChild('name') name: ElementRef;
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
  
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id = params['id'];
        this.cate.getByCategory(this.id)
        .subscribe((res: any[]) => {
          this.state = "show";
          this.meals = res;
        }); 
      }
    )
    this.cate.getByCategory(this.id)
    .subscribe((res: any[]) => {
      this.state = "show";
      this.meals = res;
    });
    this.state = "hidden";
  }
  
  postIt(data: any){
    if(data.piece){
      this.type = "grama";
    }
    else{
      this.type = "komad/a";
    }
    this.mealsService.postOrder(data)
    .subscribe(
      (res: Response) =>{ 
        this.tostr.success('Količina: '+ data.amount+  ' ' +this.type, 'Porudzbina: '+ data.info);
        console.log(res)
      },
      (error) =>{
        if(error.status === 401){
          this.tostr.error('Vaša sesija je istekla', 'Porudzbina nije prosledjena!');
        }
        else{
          this.tostr.error('Došlo je do greške', 'Pokušajte ponovo!')
        }
      }
    )
  }
  open(content) {
    this.modalService.open(content, {centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showMenu(){
    this.status = true;
    console.log(status)
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  sendIt(data: any){
    console.log(data);
      this.menuData.sendData(data);
      this.tostr.success('Prosledjeno u korpu');
  }

}
