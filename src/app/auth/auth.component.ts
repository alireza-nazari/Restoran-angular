import { Component, OnInit, NgModule } from '@angular/core';
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

  faCoffee = faCoffee;

  constructor(private authService: AuthService) { }

  ngOnInit(){
  }
  onSingUp(form: NgForm){
    const user = form.value.user;
    const pass = form.value.pass;
    console.log(user, pass);
    this.authService.singIn(user, pass);
  }
  
}
