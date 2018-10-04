import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriesService } from './categories-service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style } from '@angular/animations';
import { DataService } from '../data.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations:[
    trigger('categories', [
      state('hidden', style({
        'height': '0px',
        'transition': 'height 0s'
      })),
      state('visible', style({
        'height': '200px',
        'transition': 'height 0.3s'
      }))
    ])
  ]
})
export class CategoriesComponent implements OnInit, AfterContentInit {
  public categories: any = [];
  public state: any = 'hidden';

  page = 0;
  
  count: number = 0;
  element: number = 0;
  image: any;
  bodyR: any;
  imageTag: any;

  constructor(private cat: CategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }
  ngAfterContentInit(){

  }
  ngOnInit() {
    this.cat.getCategories()
    .subscribe(
      (data) =>{
        this.categories = data;
        this.state = 'visible'
      }
    )
  }
  getByCategory(id: any, out: ElementRef, body: any){
     this.router.navigate([id,'meni']);
     this.state = 'visible';
    this.clickedCategory(body);
  }
  clickedCategory(body: HTMLDivElement){
    console.log(body)
    body.classList.remove('inactive');
    body.classList.add('active');
    if(this.image == undefined && this.bodyR == undefined){
     this.bodyR = body;
    }
    else if(this.bodyR == body){

    }
    else{
     this.bodyR.classList.remove('active');
     this.bodyR.classList.add('inactive');
     this.bodyR = body;
    }
  }
}
