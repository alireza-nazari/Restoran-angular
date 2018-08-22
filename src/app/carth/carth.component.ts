import { Component, OnInit, Input, OnDestroy, DoCheck, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { Observable } from "rxjs";
import { MealsService } from '../meals.service';
import { ToastrService } from 'ngx-toastr';
import { isNumeric } from 'rxjs/internal-compatibility';
@Component({
  selector: 'app-carth',
  templateUrl: './carth.component.html',
  styleUrls: ['./carth.component.css']
})
export class CarthComponent implements OnInit{

  closeResult: string;
  public carth: any;
  public menu$: Observable<any>;

  public changed: any = [];
  public show: boolean = false;
  constructor(private modalService: NgbModal,
    private dataService: DataService,
    private meals: MealsService,
    private tostr: ToastrService,
    config: NgbTooltipConfig) { 
      
    }

  ngOnInit() {
  this.menu$ = this.dataService.getData();
  console.log(this.dataService.getData());
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
    console.log(data[0].data.amount)
    if(data[0].data.amount == ''){
      this.tostr.error("Porudzbina nije prosledjena", "Ispunite polje Količina")
    }
    else{
      this.meals.postOrder(data)
      .subscribe(
        () => {
          this.tostr.success("Porudzbina je uspešno prosledjena!")
        },
        (error) => {
         if(error.status == 401){
          this.tostr.error("Porudzbina nije prosledjena", "Prijavite se ponovo!")
         }else{
          this.tostr.error("Porudzbina nije prosledjena", "Došlo je do greške!")
         }
        }
      )
    }
   
  }

  emptyItem(id, element: HTMLTableRowElement, number: any){
    console.log(number)
    console.log(id)
    element.remove()
    this.dataService.deleteData(id, number)
  } 
  getIt(data: any) {
    this.changed = this.menu$;
    console.log(data)
    var i = data.position;
    this.changed[i].data.amount = data.amount;
    this.menu$ = this.changed;
    this.show = false;
    this.tostr.success("Izmenili ste količinu jela: "+ data.name)
  }
  showConfirm(elem: HTMLTableRowElement){
    this.show = true;
  }
  check(data, elem: HTMLInputElement){
    if(isNumeric(data.key) || data.key == 'Backspace'){
    }
    else{
      this.tostr.error("Količina mora biti broj")
    }
  }
}
