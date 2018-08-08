import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HeaderService{
    constructor(){}
    i: number;
    show: boolean;

    showHide(num: number, show: boolean): Observable<any[]>{
        console.log(num)
        num++;
        console.log(num)
        if(num <= 1){
          show = true;
          console.log(num)
          return Observable.of([show, num]);
        }
        else{
          show = false;
          num = 0;
          console.log(num,show)
          return Observable.of([false, num]);
        }
        
    }
}