import { Component, OnInit, NgModule, Output, EventEmitter, HostListener, DoCheck} from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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




  constructor(private authService: AuthService,
               public tostr: ToastrService) { }


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
          this.tostr.error('Pogrešna lozinka ili korisnicko ime', 'Prijavite se ponovo!');
        }
        else{
          this.tostr.error('Prijavite se ponovo!', 'Došlo je do greške!');
        }
      }
    );
  }

}
