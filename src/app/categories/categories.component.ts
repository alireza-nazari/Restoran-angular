import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        'visibility': 'hidden',
        'transition': 'height 0.3s'
      })),
      state('visible', style({
        'height': '200px',
        'visibility': 'visible',
        'transition': 'height 0.3s'
      }))
    ])
  ]
})
export class CategoriesComponent implements OnInit {

  public categories: any = [];
  public state: any = 'hidden';

  page = 0;
  
  count: number = 0;
  element: number = 0;

  constructor(private cat: CategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }

  ngOnInit() {
    this.cat.getCategories()
    .subscribe(
      (data) =>{
        this.categories = data;
        this.state = 'visible'
      }
    )
  }
  getByCategory(id: any){
   this.router.navigate([id,'meni'],{relativeTo: this.route});
   this.state = 'visible'
  }
  reset(num){
    if(this.element == num){
      console.log("prvo")
      this.data.changeOfCategory(true);
    }
    else{
      this.element = num;
      console.log("drugo");
      this.data.changeOfCategory(false);
    }
  }
}
