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
    ids: any;
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
        console.log(id)
        this.ids = null;
        if(id.constructor == Array){
            id.forEach((item, index) => {
                if(index == 0){         
                    this.ids = item.id;
                }
                else{
                    this.ids += ","+ item.id;
                }
            })
        }else{
            this.ids = id.id;
        }
        return this.http.get<any>(environment.apiBaseUrl +"orders/clientAndDate?offset="+offset+"&client_id="+this.ids+"&date="+date)
    }
    toDate(date: any, offset){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl +"orders/endDate/"+ date +"?offset="+ offset)
    }
    todayOrders(date: any, id: any){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl + "orders/date/"+date+"?offset="+id, {headers: this.headers})
    }
    fromTo(from: any, to: any, offset){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl + "orders/period?offset="+offset+"&start="+ from +"&end=" + to)
    }
    fromAndUser(date: any, id: any, offset: any){
        this.ids = null;
        if(id.constructor === Array){
        id.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
        }
        else{
            this.ids = id.id;
        }
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndStartDate?offset="+ offset +"&client_id="+ this.ids +"&start="+ date)
    }
    toAndUser(date: any, id: any, offset: any){
        this.ids = null;
        if(id.constructor === Array){
        id.forEach((item, index) => {
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
         }else{
        this.ids = id;
     }
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndEndDate?offset="+ offset +"&client_id="+ this.ids +"&end="+ date)
    }
    user(name: any){
        this.ids = null;
        if(name == ''){
            return this.http.get<any>(environment.apiBaseUrl+"clients/user/" + this.last)
        }
        if(name != null){
            this.last = name
            return this.http.get<any>(environment.apiBaseUrl+"clients/user/" + name)
        }
        return this.empty;
    }
    getByUser(data: any, offset){
        this.ids = null;
        if(data.constructor === Array){
        data.forEach((item, index) => {
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
    }
    else{
        this.ids = data;
    }
        return this.http.get<any>(environment.apiBaseUrl+"orders/clients?offset="+ offset +"&id="+ this.ids)
    }
    createArray(data){
        this.data = data;
        for(let meal of this.data){
            if(meal.piece == true){
                meal.piece = 'grama'
            }
            else if(meal.piece == false){
              meal.piece = 'kom'
            }
        }
        return this.data;
    }
    combination(from: Date, to: Date, id: any, offset: any){
        this.ids = null;
        if(id.constructor === Array){
        id.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
         }else{
        this.ids = id;
     }
        return this.http.get<any>(environment.apiBaseUrl+"orders/combination?offset="+ offset +"&start="+ from +"&end="+ to +"&client_id="+ this.ids);
    }
    emptyOut(){
        this.ids = null;
        this.data = [];
    }
    singleStartingDate(date: any, offset){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl+"orders/startDate/"+ date +"?offset="+ offset)
    }
    currentUser(offset){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl+"orders/myorders?offset="+offset);
    }
    allUsers(){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl+"clients");
    }
    changeStatus(data){
        for(let item of data){
            item.display = false;
            if(item.piece == 'grama'){
                item.piece = true
            }
            else if(item.piece == 'kom'){
              item.piece = false
            }
        }
        return this.http.put<any>(environment.apiBaseUrl+"orders/listOforders", data, {headers: this.headers});
    }
    myOrders(offset){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl+"orders/myorders?offset="+ offset)
    }
    closeOrders(date: any){
        this.ids = null;
        return this.http.post<any>(environment.apiBaseUrl+"orders/orderClosed?date="+ date +"&status=true", {headers: this.headers});
    }
    reopenOrders(date: any){
        this.ids = null;
        return this.http.put<any>(environment.apiBaseUrl+"orders/updateOrderClosed/"+ date +"?status=false", {headers: this.headers});
    }
    allTodayOrders(date: any){
        this.ids = null;
        return this.http.get<any>(environment.apiBaseUrl+"orders/singleDate/"+date);
    }
}