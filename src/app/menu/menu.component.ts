import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MealsService } from '../meals.service';

import { SearchService } from '../search.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { Router } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { SrcValueDirective } from './src-value.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  meals: any[];
  status = true;
  staticAlertClosed = true;
  error: any;

  @ViewChild('name') name: ElementRef;
  constructor(private mealsService: MealsService,
              private searchService: SearchService,
              private config: NgbDropdownConfig,
              private router: Router,
              private auth: AuthGuardService) {
              config.autoClose = false;

        }
  
  ngOnInit() {
    this.mealsService.getMeals()
    .subscribe((res: any[]) => {
      this.meals = res;
    });
    
  }
  postIt(data: any, amountInput: HTMLInputElement){
    this.mealsService.postOrder(data)
    .subscribe(
      (res: Response) =>{
        console.log(res)
      },
      error => {
        this.error = error;
      console.log(this.error)
      }
    )
  }
  ngAfterViewInit(){
  
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
