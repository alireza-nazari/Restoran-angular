import { Component, OnInit, ElementRef, DoCheck, AfterContentInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HeaderService } from './header-service';
import { trigger, state, style } from '@angular/animations';
import { DataService } from '../data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('divState', [
      state('resp', style({
        'height': '0px',
        'transition': 'height 0.2s',
      })),
      state('expand', style({
        'height': '230px',
        
        'transition': 'height 0.2s'
      })),
      state('normal', style({
        'height': '0px',
        'transition' : '0.0s'
      }))
    ]),
    trigger('display', [
      state('show', style({
        'visibility': 'hidden'
      })),
      state('hide', style({
        'visibility': 'visible'
      }))
    ])
  ]
})
export class HeaderComponent implements OnInit, DoCheck{
  status: boolean;
  tokenValue: string;
  public isCollapsed = false;
  public show: boolean = false;
  public i: number = 0;

  state = 'resp';
  public width: number;

  public number: number = 0;

  constructor(private auth: AuthService,
              private head: HeaderService,
              private data: DataService) { }
  ngOnInit(){
    this.tokenValue = localStorage.getItem('role');
    if(this.tokenValue === 'admin'){
      this.status = true;
    }
    else{
      this.status = false;
    }
    console.log
  }
  hide(){
    this.state = 'resp'
  }
  ngDoCheck(){
    this.number = this.data.returnNumber();
}
  onResize(event) {
    this.width = event.target.innerWidth;
    if(this.width <= 590){
      this.state = 'resp';
    }else{
      this.state = 'normal'
    }
  }
  singout(){
    this.auth.singOut();
  }
  animate(){
    this.state === 'resp' ? this.state = 'expand' : this.state = 'resp';
  }

}
