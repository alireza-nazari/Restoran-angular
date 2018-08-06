import { HttpHeaders, HttpResponse, } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Observable } from "rxjs";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { ComponentFactoryBoundToModule } from "@angular/core/src/linker/component_factory_resolver";
import { CrudModel } from './crud/crud-model'
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CrudService{

    constructor(public http: HttpClient,
                public firebase: AngularFireDatabase,
                public tostr: ToastrService){}

    mealList: AngularFireList<any>;
    selectedMeal: CrudModel = new CrudModel();
    
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

    // deleteMeal(id: number){
    //     return this.http.post<any>("https://udemy-ng-http-e8052.firebaseio.com/",{
    //         id_glj: id
    //     },
    //     {headers : this.headers}).map(
    //         (res: Response) => {
    //             return res;
    //         },
    //         (err: Error) =>{
    //             return err;
    //         }
    //     )
    // }
    // editMeal(){
    // }
    // postMeal(data: any[]){
    //     return this.http.post("https://udemy-ng-http-e8052.firebaseio.com/meals.json", data);
    // }
    // getData(): Observable<HttpResponse<string>>{
    //     return this.http.get<any>("https://udemy-ng-http-e8052.firebaseio.com/meals.json", {observe: 'response'});
        
    // }
    postData(crud : CrudModel)
    {
        // this.tostr.success('Submitted Succcessfully', 'Employee Register');
    this.mealList = this.firebase.list('/meals')
        
    this.mealList.push(crud)
    }
    getData(){
        this.mealList = this.firebase.list('meals');
        console.log(this.mealList)
        return this.mealList;

    }
}