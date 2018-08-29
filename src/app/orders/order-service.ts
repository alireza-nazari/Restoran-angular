import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { observable } from "rxjs";

@Injectable()
export class OrderService{
    empty: any = [];
    last: string = '';
    data: any = [];
    constructor(public http: HttpClient){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getOrders(id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/scroll?offset=" + id)
    }
    todayOrders(date: any, id: any){
        console.log(date)
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+date+"?offset="+id, {headers: this.headers})
    }
    fromTo(from: any, to: any, offset){
        return this.http.get<any>(environment.apiBaseUrl + "orders/period?offset="+offset+"&start="+ from +"&end=" + to)
    }
    user(name: any){
        console.log(this.last)
        if(name == ''){
            return this.http.get<any>(environment.apiBaseUrl+"clients/user/" + this.last)
        }
        if(name != null){
            this.last = name
            return this.http.get<any>(environment.apiBaseUrl+"clients/user/" + name)
        }
        return this.empty;
    }
    getByUser(id: number, offset){
        return this.http.get<any>(environment.apiBaseUrl+"orders/client/" + id + "?offset="+ offset)
    }
    createArray(data){
          for (let r of data) {
            if (r.piece === false) {
              this.data.push({
                type: 'gr.',
                id: r.order_id,
                name: r.client.name,
                date: r.order_date,
                mealName: r.meal.name,
                user: r.client.username,
                amount: r.quantity
              })
            } else
              if (r.piece === true) {
                this.data.push({
                  type: 'kom.',
                  id: r.order_id,
                  name: r.client.name,
                  date: r.order_date,
                  mealName: r.meal.name,
                  user: r.client.username,
                  amount: r.quantity
                })
              }
          }
        return this.data;
    }
    combination(from: Date, to: Date, id: any, offset: any){
        console.log(from, to, id)
        return this.http.get<any>(environment.apiBaseUrl+"orders/combination?offset="+ offset +"&start="+ from +"&end="+ to +"&client_id="+ id);
    }
    emptyOut(){
        this.data = [];
    }
    singleStartingDate(date: any, offset){
        return this.http.get<any>(environment.apiBaseUrl+"orders/startDate/"+ date +"?offset="+ offset)
    }
}