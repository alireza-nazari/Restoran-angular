import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MealsService } from '../meals.service';

import { SearchService } from '../search.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { CategoriesService } from '../categories/categories-service';
import { trigger, state, style } from '@angular/animations';

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

  @ViewChild('name') name: ElementRef;
  constructor(private mealsService: MealsService,
              private searchService: SearchService,
              private config: NgbDropdownConfig,
              private router: Router,
              private auth: AuthGuardService,
              private tostr: ToastrService,
              private route: ActivatedRoute,
              private cate: CategoriesService) {
              config.placement = 'bottom-right'
              config.autoClose = false;

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
    this.mealsService.postOrder(data)
    .subscribe(
      (res: Response) =>{
        this.tostr.success('Porudzbina je uspešno prosledjena');
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
  showMenu(){
    this.status = true;
    console.log(status)
  }
  click(){
    this.mealsService.getMeals().subscribe(
      
    )
  }

}
