import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  status: boolean;
  state: boolean = false;
  constructor(private auth: AuthService){}
  ngOnInit(){
    this.doSomething();
  }
  ngDoCheck(){
    this.doSomething();
  }
  checkAuth(){
    this.auth.isAuthencticated()
    .subscribe(
      (resp) => {
        if(resp == 'true'){
          this.status = true;
        }
        else if(resp == 'false'){
          this.status = false;
        }
      }
    )
  }
  doSomething(){
    this.auth.logingState()
    .subscribe(
      (res) => {
        this.checkAuth()
        if(res == true && this.status == true){
          this.state = true;
        }
        else if(res == false && this.status == false){
          this.state = false;
        }
      }
    )
  }
}
