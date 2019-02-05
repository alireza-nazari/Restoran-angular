import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants(){
    return this.http.get<any>(environment.apiBaseUrl + "restaurants");
}
}
