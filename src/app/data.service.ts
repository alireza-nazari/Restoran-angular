import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DataService{

    data: any = [];

    public number: number = 0;

    sendData(data: any){
        this.data.push({
            data
        });
        this.number += 1;
    }
    returnNumber(){
        return this.number;
    }
    getData(): Observable<any>{
        return this.data;
    }

}