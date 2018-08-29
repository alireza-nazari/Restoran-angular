import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
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
    action: boolean;
    existingData: Array<any> = [];



    sendData(data: any) {
        var current = localStorage.getItem('number');
        if (current == null) {
            localStorage.setItem('number', '0');
            var first = [];
            first = first.concat(data);
            
            localStorage.setItem('cartItems', JSON.stringify(first))
        }
        else {
            var local = JSON.parse(localStorage.getItem('cartItems'))
            var passed = [];
            passed = passed.concat(local) 
            var num = JSON.parse(current);
            num += 1;
            localStorage.setItem('number', num);
            passed = passed.concat(data)
            localStorage.setItem('cartItems', JSON.stringify(passed))
        }
    }
    getFromLocal() {
    }
    deleteData(id: any) {
        var current = localStorage.getItem('number')
        console.log(id);
        var data = JSON.parse(localStorage.getItem('cartItems'))
        data.splice(id, 1);
        var newData = JSON.stringify(data)
        localStorage.setItem('cartItems', newData)
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
            
        }
        this.data = JSON.parse(localStorage.getItem('cartItems'))
        console.log(this.data)
        return this.data;
    }
    emitNavChangeEvent(number) {
        this.navchange.emit(number);
    }
    getNavChangeEmitter() {
        return this.navchange;
    }
    changeOfCategory(response) {
        if (response == true) {
            this.state = 'not changed'
        }
        else {
            this.state = 'changed'
        }
    }
    returnState(): Observable<string> {
        return Observable.of(this.state)
    }
    clicked(data){
        this.action = data;
    }
    retrurnAction(): Observable<boolean>{
        return Observable.of(this.action)
    }
}