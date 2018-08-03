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
        return this.http.get(environment.apiBaseUrl +"glavnojelo")
    }
    getOrders(){
        return this.http.get<any>(environment.apiBaseUrl + "narudzbine")
    }

    postOrder(meal: any){
        return this.http.post<any>(environment.apiBaseUrl + "narudzbine/",{
        glavno: {
            id_glj: meal.id
        },
            kolicinaGlavnog: meal.amount
        }, {headers: this.headers})
        .map(
            (res: Response) => {
                return res;
            }
        );
    }

}