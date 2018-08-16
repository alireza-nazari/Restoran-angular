import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService{
    constructor(public http: HttpClient){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getOrders(id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/scroll?offset=" + id)
    }
    todayOrders(date: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+date, {headers: this.headers})
    }
}