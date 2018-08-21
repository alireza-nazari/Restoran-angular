import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { json } from "express";

@Injectable()
export class DataService {

    changed: boolean = false;

    data: any = [];

    pushed: boolean = false;

    page: number = 0;

    public number: number = 0;
    public retrived = [{}];
    state: any;
    navchange: EventEmitter<number> = new EventEmitter();

    sendData(data: any) {
        var current = localStorage.getItem('number');
        if (current == null) {
            localStorage.setItem('number', '0');
            localStorage.setItem('new0', JSON.stringify(data))
        }
        else {
            var num = JSON.parse(current);
            num += 1;
            localStorage.setItem('number', num);
            localStorage.setItem('new' + num, JSON.stringify(data))

        }
    }
    getFromLocal() {
    }
    deleteData(id: any, number: any) {

        var current = localStorage.getItem('number')
        console.log(id, number);
        localStorage.removeItem('new' + number.toString())
        this.data.splice(id, 1)
        var numbe = JSON.parse(current);
        numbe -= 1;
        if (numbe == 0) {
            localStorage.setItem('number', JSON.stringify(numbe))
        }
        else if (numbe < 0) {
            localStorage.removeItem('number')
        } else {
            localStorage.setItem('number', JSON.stringify(numbe))
        }

    }
    returnNumber(): number {
        var number = localStorage.getItem("number");
        var changed = JSON.parse(number);
        if (number == null) {
            return 0;
        }
        else {
            changed += 1;
            return JSON.parse(changed)
        }
    }
    getData() {
        var num = localStorage.getItem('number');
        var numb = Number(num);
        if (num == null) {
            console.log("rsa")
        }
        else {
            if (this.data == '') {
                for (var i = 0; i <= numb; i++) {
                    console.log(i)
                    this.pushed = true;
                    var stat = this.pushed;
                    var par = localStorage.getItem('new' + i);
                    var data = JSON.parse(par);
                    this.data.push({
                        data,
                        i,
                        stat
                    })
                    this.pushed = false;
                }
                return this.data;
            } else {
                for (var i = 0; i <= numb; i++) {
                    if (this.data[i] == undefined) {
                        this.pushed = true;
                        var stat = this.pushed;
                        var par = localStorage.getItem('new' + i);
                        var data = JSON.parse(par);
                        this.data.push({
                            data,
                            i,
                            stat
                        })
                        this.pushed = false;
                    }
                }

            }
        }
        console.log(this.data)
        return this.data;
    }
    emitNavChangeEvent(number) {
        this.navchange.emit(number);
      }
      getNavChangeEmitter() {
        return this.navchange;
      }
    changeOfCategory(response){
        if(response == true){
            this.state = 'not changed'
        }
        else{
            this.state = 'changed'
        }
    }
    returnState(): Observable<string>{
        return Observable.of(this.state)
    }
}