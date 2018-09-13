import { Injectable } from "@angular/core";
import { HttpHeaders, } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';

import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { environment } from '../environments/environment';
import { Observable } from "rxjs/Rx";
import { map } from "rxjs-compat/operator/map";




@Injectable()
export class MealsService{
    data: any = [];
    constructor(private http: HttpClient,
                private router: Router,
                private auth: AuthService){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getMeals(offset: number){
        return this.http.get(environment.apiBaseUrl +"meal/scroll?offset="+ offset)
    }

    postOrder(data: any){
        this.data = [];
        for(let item of data){
            this.data.push({
                meal: {
                    meal_id: item.id
                },
                piece: item.type,
                quantity: item.amount,
                display: true
            })
        }
        return this.http.post<any>(environment.apiBaseUrl +"orders/list", this.data, {headers: this.headers})
    }

}