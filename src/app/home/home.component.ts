import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  editorValue: any;

  config = {
    displayKey:"name",
    search:true,
    height: '300px',
    placeholder:'Restoran',
    noResultsFound: 'Nema rezultata',
    searchPlaceholder:'Pretraga'
  };

  public dataModel;
  public dropdownOptions;

  constructor(private res: RestaurantService, private router: Router){ }

  ngOnInit() {
    let restaurantId = sessionStorage.getItem('resId')
    let restaurantName = sessionStorage.getItem('resName')

    if(restaurantId != null){
      this.dataModel = {
        id: restaurantId,
        name: restaurantName
      }
    }
    this.getRestaurants()
  }

  selectionChanged(event){
    if (this.dataModel != null) {
      this.router.navigate([''])
      console.log(event.value.id)
      sessionStorage.setItem('resId', this.dataModel.id)   
      sessionStorage.setItem('resName', this.dataModel.name)     
    } else {
      this.router.navigate([''])
      sessionStorage.removeItem('resId')
      sessionStorage.removeItem('resName')
    }
  }

  getRestaurants(){
    this.res.getRestaurants().subscribe(
      res => {
        console.log(res)
        this.dropdownOptions = res
      },
      err => {
        console.log(err)
      }
    )
  }
}
