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
        console.log(id.constructor === Array)
        this.ids = null;
        id.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
        return this.http.get<any>(environment.apiBaseUrl +"orders/clientAndDate?offset="+offset+"&client_id="+this.ids+"&date="+date)
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
        this.ids = null;
        id.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndStartDate?offset="+ offset +"&client_id="+ this.ids +"&start="+ date)
    }
    toAndUser(date: any, id: any, offset: any){
        this.ids = null;
        id.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
        return this.http.get<any>(environment.apiBaseUrl + "orders/clientAndEndDate?offset="+ offset +"&client_id="+ this.ids +"&end="+ date)
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
    getByUser(data: any, offset){
        data.forEach((item, index) => {
            console.log(index)
            if(index == 0){         
                this.ids = item.id
            }
            else{
                this.ids += ","+item.id
            }
        })
        console.log(this.ids)
        return this.http.get<any>(environment.apiBaseUrl+"orders/clients?offset="+ offset +"&id="+ this.ids)

    }
    createArray(data){
        this.data = data;
        console.log(this.data)
        for(let meal of this.data){
            if(meal.piece == true || meal.piece == 'gram'){
                meal.piece = 'gram'
            }
            else if(meal.piece == false || meal.piece == 'kom'){
              meal.piece = 'kom'
            }
        }
        console.log(this.data)
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
    currentUser(offset){
        return this.http.get<any>(environment.apiBaseUrl+"orders/myorders?offset="+offset);
    }
    allUsers(){
        return this.http.get<any>(environment.apiBaseUrl+"clients");
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
    users(id, offset){
        return this.http.get<any>(environment.apiBaseUrl+"orders/clients?offset="+ offset +"&id=6,7,17")
    }
}