import { Component, OnInit, ViewChild, Input, ElementRef, DoCheck } from '@angular/core';
import { MealsService } from '../meals.service';
import { CrudService } from '../crud.service';
import { ResponseOptions } from '@angular/http';
import { HttpResponse } from '@angular/common/http';
import { CrudModel } from './crud-model';
import { CategoriesService } from '../categories/categories-service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit{
  edit: boolean = true;
  confirmBtn: boolean = false;
  editBtn: boolean = true;
  deleteBtn: boolean = true;

  addNewMeal: boolean = false;

  status: number;
  
  i: number = 0;
  public data = [];
  newData: any = [];
  cate: any = [];
  @ViewChild('selectedRow') row : ElementRef;
  constructor(public meals: MealsService,
              public crud: CrudService,
              public responseOptions: ResponseOptions,
              public cat: CategoriesService,
              public tostr: ToastrService,) {
            
               }
  // ngDoCheck(){
  //   this.meals.getMeals()
  //   .subscribe(
  //     (res: Response[]) => this.data = res,
  //     (err) => {
  //       alert("Nije mogce prikazati jela" + err)
  //     }
  //   )
  // }
  ngOnInit() {
    this.meals.getMeals()
    .subscribe(
      (res: Response[]) => this.data = res,
      (err) => {
        alert("Nije mogce prikazati jela" + err)
      }
    )
    this.cat.getCategories()
    .subscribe(
      (res: Response) => {
        this.cate = res;
        console.log(res);
        
      },
      (error) => {
        this.tostr.error('Došlo je do greške!');
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
  editMeal(n:any, p :any, c:any, url: any, na:any, pr:any, co:any,ur: any){
    n.hidden = false;
    p.hidden = false;
    c.hidden = false;
    url.hidden = false;
    na.hidden = true;
    pr.hidden = true;
    co.hidden = true;
    ur.hidden = true;
    this.confirmBtn = true;
  }
  confirm(n:any, p :any, c:any, id: any,url: any, na:any, pr:any, co:any,ur: any){
    n.hidden = true;
    p.hidden = true;
    c.hidden = true;
    url.hidden = true;
    na.hidden = false;
    pr.hidden = false;
    co.hidden = false;
    ur.hidden = false;
    this.confirmBtn = false;
    this.crud.editMeal({
      category: {
        category_id: c.value
      },
      name: n.value,
      price: p.value,
      link: url.value
    }, id)
    // this.meals.getMeals()
    // .subscribe(
    //   (res: Response[]) => this.data = res,
    //   (err) => {
    //     alert("Nije mogce prikazati jela" + err)
    //   }
    // )
  }

  newMealData(name: any, price: any, category: any, url: any){
    if(name.value != "" && price.value != "", category.value != "" && url.value != ""){
      this.crud.postMeal({
        category: {
          category_id: category.value
        },
        name: name.value,
        price: price.value,
        link: url.value
      })
      this.addMeal();
      this.tostr.success('Jelo je dodato!');
    }else{
      this.tostr.error('Ispunite sva polja!');
    }
  }
  deleteMeal(id: any){
    this.crud.deleteMeal(id)
  }
}
