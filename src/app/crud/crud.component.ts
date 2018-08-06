import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MealsService } from '../meals.service';
import { CrudService } from '../crud.service';
import { ResponseOptions } from '@angular/http';
import { HttpResponse } from '@angular/common/http';
import { CrudModel } from './crud-model';



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

  status: number;
  
  i: number = 0;
  public data = [];
  newData: any = [];
  @ViewChild('selectedRow') row : ElementRef;
  constructor(public meals: MealsService,
              public crud: CrudService,
              public responseOptions: ResponseOptions) {
            
               }

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
  confirm(n:any, p :any, c:any, na:any, pr:any, co:any){
    n.hidden = true;
    p.hidden = true;
    c.hidden = true;
    na.hidden = false;
    pr.hidden = false;
    co.hidden = false;
    this.confirmBtn = false;
    console.log(n.value, p.value, c.value)
  }
  // deleteMeal(id: number){
  //   this.crud.deleteMeal(id).subscribe(
  //     (res: Response) => {
  //       console.log(res)
  //     },
  //     (err: Error) =>{
  //       alert("Doslo je do greske: " + err)
  //     }
  //   )
  // }
  newMealData(name: any, price: any, cat: any, url: any){
    this.newData.push({
      name: name.value,
      price: price.value,
      category: cat.value,
      url: url.value
    })

    this.crud.postData(this.newData)
  }
  get(){
    // this.crud.getData()
    // .subscribe(
    //   (response => {
    //     console.log(response.body[1])
    //   })
    // )
    var x = this.crud.getData();
    x.snapshotChanges().subscribe(item => {
      this.newData = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.newData.push(y as CrudModel);
      });
    });
    console.log(this.newData);
    
  }
}
