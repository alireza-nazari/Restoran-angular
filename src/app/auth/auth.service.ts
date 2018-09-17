import { Injectable, Input} from "@angular/core";
import { HttpHeaders, } from "@angular/common/http";
import { map } from 'rxjs/operators';

import decode from 'jwt-decode';

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { StatusService } from "./status.service";
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class AuthService{
    login: boolean;
    authState: boolean;
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
    public isAuthencticated(): any{
        const token = this.getToken();
        if(token !== null){
            return Observable.of("true");
        }
        else{
            this.authState = true;
            return Observable.of("false");
        }
    }
    public singIn(username: string, password: string){
        return this.http.post<any>(environment.apiBaseUrl+"clients/login", {
            username: username,
            password: password
        }, {headers: this.headers})
        .map(
            (response: Response) => {
                const data = JSON.stringify(response);
                const novo = data.replace(/['"]+/g, '');
                localStorage.setItem('token', novo);
                const tokenPayload = decode(novo);
                localStorage.setItem('role', tokenPayload.role);
                this.router.navigate(['/'])
                this.logingState();
            },
        );
    }
    public singOut(): void{
        this.show = false;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login'])
        this.logingState();
    }
    logingState(){
        this.isAuthencticated()
        .subscribe(
            (res) => {
                if(res == 'true'){
                    this.login = true;
                }
                else if(res == 'false'){
                    this.login = false;
                }
            }
        )
        return Observable.of(this.login);
    }
}