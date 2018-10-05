import { HttpHeaders, HttpResponse, } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Observable } from "rxjs";
import { CrudModel } from './crud/crud-model'
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CrudService{

    constructor(public http: HttpClient,
                public tostr: ToastrService){}


    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    deleteMeal(id: number){
        console.log(id);
        
        return this.http.delete(environment.apiBaseUrl+"meal/"+id,
        {headers : this.headers})
        .subscribe(
            (res: Response) =>{
                this.tostr.success('Jelo je obrisano!'); 
            },
            (error) => {
                this.tostr.error('Jelo nije obrisano!', 'Pokušajte ponovo');   
            }
        )
    }
    postMeal(data:any){
        return this.http.post(environment.apiBaseUrl+"meal",data,{headers: this.headers})
        .subscribe(
            (res: Response) => {
                this.tostr.success('Jelo je izmenjeno!');   
            },
            (error) =>{
                this.tostr.error('Jelo je nije izmenjeno!');       
            }
        )
    }
    editMeal(data, id: any){
        console.log(data);
        return this.http.put(environment.apiBaseUrl+"meal/"+id,data,{headers: this.headers})
        .subscribe(
            (res: Response) => {
                this.tostr.success('Jelo je izmenjeno!');    
            },
            (error) =>{
                this.tostr.error('Jelo nije izmenjeno!', 'Pokušajte ponovo');   
            }
        )
    }

}