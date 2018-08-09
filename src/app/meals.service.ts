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
    constructor(private http: HttpClient,
                private router: Router,
                private auth: AuthService){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getMeals(){
        return this.http.get(environment.apiBaseUrl +"meal")
    }

    postOrder(data: any){
        console.log(data.id, data.amount);  
        return this.http.post<any>(environment.apiBaseUrl +"orders",{
            meal: {
                meal_id: data.id
            },
            quantity: data.amount,
            piece: data.piece
        }, {headers: this.headers})
    }

}