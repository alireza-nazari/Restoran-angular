import { Component, OnInit, Input, OnDestroy, DoCheck } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { Observable } from "rxjs";
import { MealsService } from '../meals.service';
@Component({
  selector: 'app-carth',
  templateUrl: './carth.component.html',
  styleUrls: ['./carth.component.css']
})
export class CarthComponent implements OnInit, OnDestroy, DoCheck {

  closeResult: string;
  public carth: any;
  public menu$: Observable<any>;
  

  constructor(private modalService: NgbModal,
              private dataService: DataService,
              private meals: MealsService) { }

  ngOnInit(){
    this.menu$ = this.dataService.getData();
    console.log(this.menu$)
  }
  ngOnDestroy(){
    // if(this.menu$.length() != 0){
    //   alert('puna')
    // }
  }
  ngDoCheck(){

  }
  open(content) {
    this.modalService.open(content, {centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  data(data: HTMLTableElement){
    
  }
  submit(data: any){
    console.log(data)
    this.meals.postOrder(data)
    .subscribe(
      (res: Response) =>{
        console.log(res)
      },
      (error) =>{
        console.log(error)
      }
    )
  }
  empty(){
    this.menu$
  }
}
