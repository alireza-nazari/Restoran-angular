import { Component, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
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
export class CategoriesComponent implements OnInit {
  @ViewChild('outlet') public outlet: ElementRef;
  public categories: any = [];
  public state: any = 'hidden';

  page = 0;
  
  count: number = 0;
  element: number = 0;
  image: any;
  bodyR: any;
  constructor(private cat: CategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }

  ngOnInit() {
    this.cat.getCategories()
    .subscribe(
      (data) =>{
        console.log(data)
        this.categories = data;
        this.state = 'visible'
      }
    )
  }
  getByCategory(id: any, out: ElementRef, img: HTMLImageElement, body: HTMLDivElement){
   this.router.navigate([id,'meni'])
   this.state = 'visible';
   img.classList.remove('inactive');
   body.classList.remove('inactive');
   body.classList.add('active');
   img.classList.add('active');
   console.log(img, this.image)
   if(this.image == undefined && this.bodyR == undefined){
    this.image = img;
    this.bodyR = body;
   }
   else{
    this.image.classList.remove('active');
    this.bodyR.classList.remove('active');
    this.image.classList.add('inactive');
    this.bodyR.classList.add('inactive');
    this.image = img;
    this.bodyR = body;
   }
  }
}
