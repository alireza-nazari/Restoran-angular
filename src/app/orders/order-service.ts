import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { observable } from "rxjs";

@Injectable()
export class OrderService{
    empty: any = [];
    last: string = '';
    data: any = [];
    change: any = [];
    constructor(public http: HttpClient){}
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    getOrders(id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/scroll?offset=" + id)
    }
    singleDate(date: any, id: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+ date +"?offset="+id, {headers: this.headers})
    }
    singleDateUser(date: any, id: any, offset){
        return this.http.get<any>(environment.apiBaseUrl +"orders/clientAndDate?offset="+offset+"&client_id="+id+"&date="+date)
    }
    toDate(date: any, offset){
        return this.http.get<any>(environment.apiBaseUrl +"orders/endDate/"+ date +"?offset="+ offset)
    }
    todayOrders(date: any, id: any){
        console.log(date)
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+date+"?offset="+id, {headers: this.headers})
    }
    fromTo(from: any, to: any, offset){
        return this.http.get<any>(environment.apiBaseUrl + "orders/period?offset="+offset+"&start="+ from +"&end=" + to)
    }
    fromAndUser(date: any, id: any, offset: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndStartDate?offset="+ offset +"&client_id="+ id +"&start="+ date)
    }
    toAndUser(date: any, id: any, offset: any){
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndEndDate?offset="+ offset +"&client_id="+ id +"&end="+ date)
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
        this.data = data;
        console.log(this.data)
        for(let meal of this.data){
            if(meal.piece == true){
                meal.piece = 'gram'
            }
            else if(meal.piece == false){
              meal.piece = 'kom'
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
    changeStatus(data){
        console.log(data)
        for(let item of data){
            item.display = false;
            for(let item of data){
                if(item.piece == 'gram'){
                    item.piece = 'true'
                }
                else if(item.piece == 'kom'){
                  item.piece = false
                }
            }
        }
        return this.http.put<any>(environment.apiBaseUrl+"orders/listOforders", data, {headers: this.headers});
    }
}