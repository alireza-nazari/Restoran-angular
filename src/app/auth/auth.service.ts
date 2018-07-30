import { Injectable } from "@angular/core";
import { HttpHeaders, } from "@angular/common/http";
import { map } from 'rxjs/operators';

import decode from 'jwt-decode';

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StatusService } from "./status.service";


@Injectable()
export class AuthService{
    constructor(private http: HttpClient,
                private location: Location,
                private router: Router,
                private stat: StatusService){}
    show: boolean = true;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    public getToken(): string{
        return localStorage.getItem('token');
    }
    public isAuthencticated(): boolean{
        const token = this.getToken();
        // return !this.jwtHelper.isTokenExpired(token);
        if(token !== null){
            return true;
        }
        else{
            return false;
        }
    }
    public singIn(username: string, password: string){
        
        return this.http.post<any>("http://192.168.0.120:8080/narudzbina/webapi/klijenti/login", {
            username: username,
            password: password
        }, {headers: this.headers})
        .subscribe(
            (response: Response) => {
                const data = JSON.stringify(response);
                const novo = data.replace(/['"]+/g, '');
                localStorage.setItem('token', novo);
                const tokenPayload = decode(novo);
                localStorage.setItem('role', tokenPayload.role);
                this.router.navigate(['/'])
                location.reload(); 
            },
            (err) => {
                alert("Pogrešili ste lozinku")
            }            
        );
    }
    public singOut(): void{
        this.show = false;
        localStorage.clear();
        location.reload();
    }
}