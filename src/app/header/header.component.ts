import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status: boolean;
  tokenValue: string;
  constructor(private auth: AuthService) { }

  ngOnInit(){
    this.tokenValue = localStorage.getItem('role');
    if(this.tokenValue === 'admin'){
      this.status = true;
    }
    else{
      this.status = false;
    }
    
  }
  singout(){
    this.auth.singOut();
  }

}
