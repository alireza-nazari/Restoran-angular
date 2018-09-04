import { Component, OnInit, ViewChild,  ElementRef} from '@angular/core';
import { MealsService } from '../meals.service';
import { CrudService } from '../crud.service';
import { ResponseOptions } from '@angular/http';

import { CategoriesService } from '../categories/categories-service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit{
  term: string = '';
  edit: boolean = true;
  confirmBtn: boolean = false;
  editBtn: boolean = true;
  deleteBtn: boolean = true;

  addNewMeal: boolean = false;
  offset: number = 0;
  status: number;
  
  closeResult: string;

  modalName: string;
  modalDeleteId: any;


  i: number = 0;
  a: number = 0;
  public data = [];
  newData: any = [];
  cate: any = [];
  @ViewChild('selectedRow') row : ElementRef;
  constructor(public meals: MealsService,
              public crud: CrudService,
              public responseOptions: ResponseOptions,
              public cat: CategoriesService,
              public tostr: ToastrService,
              private modalService: NgbModal) {
            
               }
  type(me: HTMLSpanElement){
    
  }
  ngOnInit() {
    this.meals.getMeals(this.offset)
    .subscribe(
      (res: Response[]) => {
        this.data = res
        for(let item of this.data){
          if(item.piece == false){
            item.piece = 'komad';
          }
          else if(item.piece == true){
            item.piece = 'gram'
          }
        }
        console.log(res)
      },
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
  open(content, name, id) {
    this.modalName = name;
    this.modalDeleteId = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
  editMeal(n:any, p :any, c:any, url: any, mes: any, na:any, pr:any, co:any,ur: any, me: any){
    this.a++;
    if(this.a <= 1){
      n.hidden = false;
      p.hidden = false;
      c.hidden = false;
      url.hidden = false;
      mes.hidden = false
      na.hidden = true;
      pr.hidden = true;
      co.hidden = true;
      ur.hidden = true;
      me.hidden = true;
      this.confirmBtn = true;
    }
    else{
      n.hidden = true;
      p.hidden = true;
      c.hidden = true;
      url.hidden = true;
      mes.hidden = true
      na.hidden = false;
      pr.hidden = false;
      co.hidden = false;
      ur.hidden = false;
      me.hidden = false;
      this.confirmBtn = false;
      this.a = 0;
    }

  }
  confirm(n:any, p :any, c:any, mes: any,id: any,url: any, na:any, pr:any, co:any,ur: any, me: any){
    console.log(mes.value)
    n.hidden = true;
    p.hidden = true;
    c.hidden = true;
    mes.hidden = true;
    url.hidden = true;
    na.hidden = false;
    pr.hidden = false;
    co.hidden = false;
    ur.hidden = false;
    me.hidden = false;
    this.confirmBtn = false;
    this.crud.editMeal({
      category: {
        category_id: c.value
      },
      name: n.value,
      price: p.value,
      link: url.value,
      piece: mes.value
    }, id)
    
  }

  newMealData(name: any, price: any, category: any, url: any, measure: any){
    if(name.value != "" && price.value != "", category.value != "" && url.value != "" && measure.value != ""){
      this.crud.postMeal({
        category: {
          category_id: category.value
        },
        name: name.value,
        price: price.value,
        link: url.value,
        piece: measure.value,
        display: false
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
  moreMeals(){
    this.offset += 10;
    this.meals.getMeals(this.offset)
    .subscribe(
      (res: Response[]) => {
        if(res == []){
          this.tostr.info('Prikazali ste sva jela!')
        }

        this.data = this.data.concat(res);
        console.log(this.data)
        for(let item of this.data){
          console.log(item.piece)
          if(item.piece == false){
            item.piece = 'komad';
          }
          else if(item.piece == true){
            item.piece = 'gram'
          }
        }
      },
      (error) => {
        this.tostr.error('Nije moguce prikazati jela!');
      }
    )
  }
}
