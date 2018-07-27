import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MealsService } from '../meals.service';
import { Response } from '@angular/http';
import { SearchService } from '../search.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { Config } from 'protractor';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { SrcValueDirective } from './src-value.directive';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  meals: any[];
  status = true;
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
    this.mealsService.postMeal(data);
    setInterval(() => {
      this.status = true
    }, 4000)
    setTimeout(() => {
      this.status = false;
    }, 1)
    console.log(this.name.nativeElement.value);
  }
  ngAfterViewInit(){
    setTimeout(() => {
      const name = this.name.nativeElement;
      console.log(name);
      if(name == 'karadjordjeva'){
        console.log('karadjordjeva')
      }
      else{
        console.log('ostalo')
      }
    }, 100);
  }
  showMenu(){
    this.status = true;
    console.log(status)
  }
  click(){
    this.mealsService.getMeals()
  }
}
