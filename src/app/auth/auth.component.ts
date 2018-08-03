import { Component, OnInit, NgModule, Output, EventEmitter} from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ]
})
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  status: number;
  show: boolean = false;
  alertMessageValue: string;
  alertType: string;

  constructor(private authService: AuthService) { }

  ngOnInit(){
  }
  onSingUp(form: NgForm){
    const user = form.value.user;
    const pass = form.value.pass;
    console.log(user, pass);
    this.authService.singIn(user, pass).subscribe(
      res => {},
      error => {
        this.status = error.status;
        if(this.status === 401){
          this.alertMessageValue = "Pogrešili ste lozinku";
          this.alertType = "danger";
          setTimeout(() => {
            this.show = true
          }, 0)
        }
        else{
          this.alertMessageValue = "Došlo je do greške";
          this.alertType = "danger";
          setTimeout(() => {
            this.show = true
          }, 0)
        }
        setTimeout(() => {
          this.show = false;
        }, 5000)
      }
    );
  }

}
