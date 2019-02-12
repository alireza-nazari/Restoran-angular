
import { Component, ElementRef, DoCheck, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { CategoriesService } from '../categories/categories-service';
import { trigger, state, style } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { Subscription, Observable, Subject} from 'rxjs';
import { take, first, takeUntil, map } from 'rxjs/operators'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menuTransition', [
      state('hidden', style({
        'visibility': 'hidden',
        'height': '0px',
        'transition': 'height 0.2s'
      })),
      state('show', style({
        'visibility': 'visible',
        'height': '20px',
        'transition': 'height 0.2s'
      }))
    ])
  ]
})
export class MenuComponent implements DoCheck, OnDestroy {
  meals: any = [];
  response: any = [];
  sub: any;
  status = true;
  try: boolean = false;
  staticAlertClosed = true;
  error: any;
  spinerGroup: boolean = false;

  public state: any = "hidden";

  public id: any;

  closeResult: string;
  type: string;

  menu: any;
  page: number = 0;

  previousPage: number;



  identifer: any;
  subscribeState: string;
  public visible: boolean = false;
  count = 0;
  subed: Subscription;
  subede: Subscription;
  spiner: boolean = false;
  alert: boolean = false;
  times: number = 0;
  more: boolean = true;
  last: any = [];
  check: number;
  doc: any;
  @ViewChild('cont') public outlet: ElementRef;
  private destroyed$ = new Subject();
  constructor(
    private tostr: ToastrService,
    private route: ActivatedRoute,
    private cate: CategoriesService,
    private modalService: NgbModal,
    private menuData: DataService){
  }
  ngDoCheck() {
    if (this.id != this.route.snapshot.params['id'] || this.id == 'undefined') {
      this.meals = [];
      this.page = 0;
      this.getMealsByID(this.page)
    } else {
    }
  }
  closeAlert() {
    this.alert = false;
  }
  onInViewportChange(inViewport: boolean) {
    console.log("DSa")
    this.visible = inViewport;
    if(this.visible == true){
      this.getMealsByID(this.page);
    }
  }
  getMealsByID(num: number) {
    this.id = this.route.snapshot.params['id'];
    if (this.id == this.identifer) {
      this.oldData(this.page)
    }
    else{
      this.page = 0;
      this.identifer = this.id
      this.newData(this.page)
    }
  }

  oldData(num) {
    this.alert = false;
    this.spinerGroup = true;
    var sub = this.cate.getByCategory(this.id, num)
      .subscribe(
        (res: Array<any>[]) => {
          if (res.length > 0) {
            setTimeout(() => {
              this.spiner = true;
            }, 1)
            this.meals = this.meals.concat(res);
            for (let meal of this.meals) {
              if (meal.piece == true) {
                meal.piece = 'gram'
              }
              else if (meal.piece == false) {
                meal.piece = 'komad'
              }
            }
            this.page += 5;
          }
          if (res.length == 0) {
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 5000)
            
          }
          this.spinerGroup = false;
        },
        (error) => {
          this.spinerGroup = false;
        }
      );
     
  }
  newData(num){
    this.more = true;
      this.alert = false;
      this.outlet.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
      this.spinerGroup = true;
      var sub = this.cate.getByCategory(this.id, num)
      .pipe(
        takeUntil(this.destroyed$)
      )
        .subscribe(
          (res: Array<any>[]) => {
            setTimeout(() => {
              this.spiner = true;
            }, 1)
            this.meals = res;
            for (let meal of this.meals) {
              if (meal.piece == true) {
                meal.piece = 'gram'
              }
              else if (meal.piece == false) {
                meal.piece = 'komad'
              }
            }
            this.page += 5;
            this.spinerGroup = false;
            this.more = false;
          },
          (error) => {
            this.spinerGroup = false;
          }
        );
  }
  showMore(){
    if(this.last.length == 0){
      this.oldData(this.page);
    }
    else{
      this.oldData(this.page);
      this.page += 5;
    }
  }
  open(content) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showMenu() {
    this.status = true;
    console.log(status)
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
  sendIt(data: any) {
    if(data.amount < 1){
      alert("Kolicina mora biti veca od 0")
    }else{
      if (data.type == 'komad') {
        data.type = false;
      } else {
        data.type = true;
      }
      this.menuData.sendData(data);
      this.tostr.success('Prosledjeno u korpu');
    }
  }
  ngOnDestroy(): void{
    this.destroyed$.next();
  }
}
