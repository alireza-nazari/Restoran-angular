import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  staticAlertClosed = true;

  @Input('auth') masterName: Array<string>;

  constructor() {  }

  ngOnInit(){
    console.log(this.masterName)
  }
} 
