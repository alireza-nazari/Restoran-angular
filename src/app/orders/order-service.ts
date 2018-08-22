import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { observable } from "rxjs";

@Injectable()
export class OrderService{
    empty: any = []
    constructor(public http: HttpClient){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getOrders(id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/scroll?offset=" + id)
    }
    todayOrders(date: any, id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+date+"?offset="+id, {headers: this.headers})
    }
    fromTo(from: any, to: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/period?offset=0&start="+ from +"&end=" + to)
    }
    user(name: any){
        console.log(name.key)
        if(name != null){
            return this.http.get<any>(environment.apiBaseUrl+"clients/user/" + name)
        }
        return this.empty;
    }
    getByUser(id: number){
        return this.http.get<any>(environment.apiBaseUrl+"orders/client/" + id + "?offset0")
    }
}