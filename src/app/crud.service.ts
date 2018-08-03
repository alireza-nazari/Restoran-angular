import { HttpHeaders, } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';


@Injectable()
export class CrudService{

    constructor(public http: HttpClient){}

    
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

    deleteMeal(id: number){
        return this.http.post<any>(environment.apiBaseUrl+ "glavnojelo",{
            id_glj: id
        },
        {headers : this.headers}).map(
            (res: Response) => {
                return res;
            },
            (err: Error) =>{
                return err;
            }
        )
    }
    editMeal(){
        
    }
}