import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class CategoriesService{

    data: any = [];
    constructor(private http: HttpClient){}

    getCategories(){
        return this.http.get<any>(environment.apiBaseUrl + "category");
    }
    getByCategory(id: any, page: number){
        let resId = sessionStorage.getItem('resId')
        return this.http.get<any>(environment.apiBaseUrl + "meal/restaurant/" + resId + "/category/" + id +"?offset="+ page);
    }
}