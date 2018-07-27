import { Component, OnInit, Input } from '@angular/core';
import { MealModel } from './meal.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() meal: MealModel;

  constructor() {}
  
  ngOnInit() {
    
  }

}
