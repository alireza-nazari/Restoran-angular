import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  status: boolean;
  constructor(private auth: AuthService){}
  ngOnInit(){
    this.status = this.auth.isAuthencticated();
    console.log(this.status)
  }
}
