import { Injectable } from "@angular/core";
import { HttpHeaders, } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { NumberValueAccessor } from "@angular/forms/src/directives";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { environment } from '../environments/environment';

@Injectable()
export class MealsService{
    constructor(private http: HttpClient,
                private router: Router,
                private auth: AuthService){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getMeals(){
        return this.http.get(environment.apiBaseUrl +"narudzbina/webapi/glavnojelo")
    }
    getOrders(){
        return this.http.get<any>(environment.apiBaseUrl + "narudzbina/webapi/narudzbine")
    }
    postMeal(meal: any){
        return this.http.post<any>(environment.apiBaseUrl + "narudzbina/webapi/narudzbine/",{
        glavno: {
            id_glj: meal.id
        },
            kolicinaGlavnog: meal.amount
        }, {headers: this.headers})
        .subscribe(
            data => console.log(data),
            err => {
                this.auth.singOut();
                alert("Vaša sesija je istekla, morate se ponovo ulogovati")
            }
        );
    }
}