import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriesService{

    constructor(private http: HttpClient){}

    getCategories(){
        return this.http.get<any>(environment.apiBaseUrl + "category");
    }
    getByCategory(id: any, page: number){
        return this.http.get<any>(environment.apiBaseUrl + "meal/category/" + id +"/scroll?offset="+0);
    }
}