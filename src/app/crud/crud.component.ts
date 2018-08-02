import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  edit: boolean = true;
  confirmBtn: boolean = false;
  editBtn: boolean = true;
  deleteBtn: boolean = true;

  addNewMeal: boolean = false;

  i: number = 0;
  public data = [];
  @ViewChild('selectedRow') row : ElementRef;
  constructor(public meals: MealsService) { }

  ngOnInit() {
    this.meals.getMeals()
    .subscribe(
      (res: Response[]) => this.data = res,
      (err) => {
        alert("Nije mogce prikazati jela" + err)
      }
    )
  }
  addMeal(){
    this.i++;
    if(this.i <= 1){
      this.addNewMeal = true;
    }
    else{
      this.addNewMeal = false;
      this.i = 0;
    }
  }
  editMeal(n:any, p :any, c:any, na:any, pr:any, co:any){
    n.hidden = false;
    p.hidden = false;
    c.hidden = false;
    na.hidden = true;
    pr.hidden = true;
    co.hidden = true;
    
    this.confirmBtn = true;
  }
  deleteMeal(id: number){
    console.log(id) 
  }
  newMealData(name: any, price: any, cat: any, url: any){
    console.log(name, price, cat, url)
  }
}
