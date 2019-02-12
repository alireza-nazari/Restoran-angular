import { Component, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { Observable } from "rxjs";
import { MealsService } from '../meals.service';
import { ToastrService } from 'ngx-toastr';
import { isNumeric } from 'rxjs/internal-compatibility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carth',
  templateUrl: './carth.component.html',
  styleUrls: ['./carth.component.css']
})
export class CarthComponent implements OnInit{

  closeResult: string;
  public carth: any;
  public menu$: Observable<any>;
  dat: any = [];
  public changed: any = [];
  public show: boolean = false;
  constructor(private modalService: NgbModal,
    private dataService: DataService,
    private meals: MealsService,
    private tostr: ToastrService,
    private router: Router) { 
      
    }

  ngOnInit() {
  this.menu$ = this.dataService.getData();
  }
  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  submit(data: any) {
    var state;
    console.log(data)
    for(let meal of data){
      if(meal.type == 'gram'){
          meal.type = true
      }
      else if(meal.type == 'kom'){
        meal.type = false
      }
    }
    console.log(data)
    for(let item of data){
      console.log(isNaN(item.amount))
      if(item.amount == ''){
        state = 'empty';
      }
    }
    if(state == 'empty'){
      this.tostr.error("Porudzbina nije prosledjena", "Ispunite polje Količina")
    }
    else {
      this.meals.postOrder(data)
      .subscribe(
        () => {
          this.tostr.success("Porudzbina je uspešno prosledjena!");
          this.menu$ = null;
          localStorage.setItem('cartItems', '[]');
          localStorage.removeItem('number');
          setTimeout(() => {
            this.router.navigate(['']);
          }, 500)
        },
        (error) => {
          console.log(error)
         if(error.status == 401){
          this.tostr.error("Porudzbina nije prosledjena", "Prijavite se ponovo!")
         }else if(error.status == 403){
          this.tostr.error("Porudzbine su zatvorene za danas", "Porudzbina nije prosledjena!")
         }
        }
      )
    }
  }

  emptyItem(id, element: HTMLTableRowElement){
    console.log(id)
    element.remove()
    this.dataService.deleteData(id)
  } 
  getIt(data: any, amount: HTMLInputElement){
    console.log(data)
    if(data.amount == ''){
      this.tostr.error("Unesite količinu jela")
    }
    else if(data.amount <= 0){
      this.tostr.error("Količina ne može biti negativna")
    }
    else {
      var i = JSON.parse(data.position);
    var local = localStorage.getItem('cartItems');
    var parsed = JSON.parse(local);
    parsed[i].amount = data.amount;
    this.menu$ = parsed;
    localStorage.setItem('cartItems', JSON.stringify(parsed))
    this.show = false;
    this.tostr.success("Izmenili ste količinu jela: "+ data.name)
    }
    
  }
  showConfirm(elem: HTMLTableRowElement){
    this.show = true;
  }
  check(data, elem: HTMLInputElement){
    if(isNumeric(data.key) || data.key == 'Backspace'){
    }
    else{
      this.tostr.error('Količina mora biti broj');
    }
  }
  testIfNum() {

  }
}
